<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'date_debut',
        'date_fin',
        'prix_total',
        'facture_acquittee',
        'user_id',
        'espace_id',
    ];

    protected $casts = [
        'date_debut'        => 'date',
        'date_fin'          => 'date',
        'facture_acquittee' => 'boolean',
        'prix_total'        => 'decimal:2',
    ];

    // Une réservation appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Une réservation concerne un espace
    public function espace()
    {
        return $this->belongsTo(Espace::class, 'espace_id');
    }
}
