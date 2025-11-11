<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Monitoring extends Model
{
    protected $table = "monitoring";
    protected $fillable = [
        'reklame_id',
        'tim_id',
        'tanggal',
        'cek_lapangan',
        'status',
        'keberadaan_reklame',
        'kelayakan_kontruksi',
        'kesesuaian',
        'catatan',
        'tl',
        'latitude',
        'longitude',
        'foto', 
    ];
    public function tim()
    {
        return $this->belongsTo(Tim::class, 'tim_id');
    }

    public function reklame()
    {
        return $this->belongsTo(Reklame::class, 'reklame_id');
    }
    public function getTimStIdsAttribute()
    {
        return explode(',', $this->tim_st);
    }

    // Accessor untuk mendapatkan nama user dari tim_st
    public function getTimStNamesAttribute()
    {
        $ids = $this->tim_st_ids;
        return \App\Models\User::whereIn('id', $ids)->pluck('name')->toArray();
    }

    // Jika mau jadi string nama user dipisah koma
    public function getTimStNamesStringAttribute()
    {
        return implode(', ', $this->tim_st_names);
    }
}
