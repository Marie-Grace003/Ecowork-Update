<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipement extends Model
{
    protected $fillable = [
        'nom',
    ];

    // Un équipement appartient à plusieurs espaces
    public function espaces()
    {
        return $this->belongsToMany(
            Espace::class,
            'espace_equipement',
            'equipement_id',
            'espace_id'
        );
    }
}
