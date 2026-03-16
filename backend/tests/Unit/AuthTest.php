<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    // Test 1 — Login avec bons identifiants
    public function test_login_avec_bons_identifiants()
    {
        User::create([
            'nom'          => 'Ako',
            'prenom'       => 'Ange',
            'email'        => 'akoange604@gmail.com',
            'mot_de_passe' => Hash::make('ephraim235'),
            'telephone'    => '0711385546',
            'adresse'      => '1 rue de la paix',
            'type'         => 'user',
        ]);

        $response = $this->postJson('/api/login', [
            'email'        => 'akoange604@gmail.com',
            'mot_de_passe' => 'ephraim235',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }

    // Test 2 — Login avec mauvais identifiants
    public function test_login_avec_mauvais_identifiants()
    {
        $response = $this->postJson('/api/login', [
            'email'        => 'faux@ecowork.com',
            'mot_de_passe' => 'mauvaismdp',
        ]);

        $response->assertStatus(401);
    }

    // Test 3 — Inscription d'un nouvel utilisateur
    public function test_inscription_utilisateur()
    {
        $response = $this->postJson('/api/register', [
            'nom'          => 'Ako',
            'prenom'       => 'Ange',
            'email'        => 'nouveau@ecowork.com',
            'mot_de_passe' => 'ephraim235',
            'telephone'    => '0711385546',
            'adresse'      => '1 rue de la paix',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['token']);
    }

    // Test 4 — Login admin
    public function test_login_admin()
    {
        User::create([
            'nom'          => 'EcoWork',
            'prenom'       => 'Admin',
            'email'        => 'admin@ecowork.com',
            'mot_de_passe' => Hash::make('admin123'),
            'telephone'    => '0600000000',
            'adresse'      => '1 rue admin',
            'type'         => 'admin',
        ]);

        $response = $this->postJson('/api/login', [
            'email'        => 'admin@ecowork.com',
            'mot_de_passe' => 'admin123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }
}
