<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@ecowork.com'],
            [
                'nom'          => 'Admin',
                'prenom'       => 'EcoWork',
                'mot_de_passe' => Hash::make('admin123'),
                'type'         => 'admin',
                'telephone'    => '0600000000',
                'adresse'      => '11 rue de la Paix, Paris',
            ]
        );
    }
}
