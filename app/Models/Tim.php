<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tim extends Model
{
    protected $table = 'tim';
    protected $fillable = [
        'petugas1',
        'petugas2',
        'bulan',
        'tahun'
    ];
    public function petugasSatu()
    {
        return $this->belongsTo(User::class, 'petugas1');
    }

    public function petugasDua()
    {
        return $this->belongsTo(User::class, 'petugas2');
    }
}
