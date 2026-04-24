<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('type', 'user')->paginate(10);
        return response()->json($users);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$request->user()->isAdmin() && $request->user()->id !== $user->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'nom'       => 'string|max:255',
            'prenom'    => 'string|max:255',
            'email'     => 'email|unique:users,email,' . $id,
            'telephone' => 'string',
            'adresse'   => 'string',
        ]);

        $user->update($request->only([
            'nom', 'prenom', 'email', 'telephone', 'adresse'
        ]));

        return response()->json($user);
    }

    public function updatePassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->user()->id !== $user->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'ancien_mot_de_passe'       => 'required',
            'nouveau_mot_de_passe'      => 'required|min:8',
            'confirmation_mot_de_passe' => 'required|same:nouveau_mot_de_passe',
        ]);

        if (!Hash::check($request->ancien_mot_de_passe, $user->mot_de_passe)) {
            return response()->json([
                'message' => 'Ancien mot de passe incorrect'
            ], 401);
        }

        // Mettre à jour le mot de passe
        $user->update([
            'mot_de_passe' => Hash::make($request->nouveau_mot_de_passe),
        ]);

        return response()->json(['message' => 'Mot de passe modifié avec succès']);
    }

    // DELETE /api/users/{id} — soft delete
    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Un utilisateur ne peut supprimer que son propre compte
        if (!$request->user()->isAdmin() && $request->user()->id !== $user->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $user->delete(); // ← remplit deleted_at, ne supprime pas vraiment

        return response()->json(['message' => 'Compte supprimé avec succès']);
    }

    // POST /api/admin/users — créer un admin (admin seulement)
    public function createAdmin(Request $request)
    {
        $request->validate([
            'nom'          => 'required|string|max:255',
            'prenom'       => 'required|string|max:255',
            'email'        => 'required|email|unique:users',
            'mot_de_passe' => 'required|min:8',
            'telephone'    => 'required|string',
            'adresse'      => 'required|string',
        ]);

        $admin = User::create([
            'nom'          => $request->nom,
            'prenom'       => $request->prenom,
            'email'        => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'telephone'    => $request->telephone,
            'adresse'      => $request->adresse,
            'type'         => 'admin',
        ]);

        return response()->json($admin, 201);
    }
}
