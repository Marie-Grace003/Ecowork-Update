<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EspacePhoto extends Model
{
    protected $fillable = [
        'espace_id',
        'chemin',
    ];

    // Une photo appartient à un espace
    public function espace()
    {
        return $this->belongsTo(Espace::class);
    }
}
