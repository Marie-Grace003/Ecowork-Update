<?php

namespace Database\Seeders;

use App\Models\Equipement;
use Illuminate\Database\Seeder;

class EquipementSeeder extends Seeder
{
    public function run(): void
    {
        $equipements = [
            'Grande table de réunion',
            'Table individuelle',
            'Vidéo projecteur',
            'Climatisation',
            'Sono et micro',
            'Internet wifi haut débit',
            'Photocopieur',
            'Machine à café',
        ];

        foreach ($equipements as $nom) {
            Equipement::firstOrCreate(['nom' => $nom]);
        }
    }
}
