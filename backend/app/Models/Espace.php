<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Espace extends Model
{
    use SoftDeletes; // ← ajouté

    protected $fillable = [
        'nom',
        'surface',
        'type',
        'tarif_journalier',
    ];

    // Un espace a plusieurs réservations
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'espace_id');
    }

    // Un espace a plusieurs équipements
    public function equipements()
    {
        return $this->belongsToMany(
            Equipement::class,
            'espace_equipement',
            'espace_id',
            'equipement_id'
        );
    }

    // Un espace a plusieurs photos
    public function photos()
    {
        return $this->hasMany(EspacePhoto::class);
    }
}
