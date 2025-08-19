<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    protected $table = 'dokumen';
    protected $fillable = [
        'nama',
        'type',
        'path',
        'status',
    ];

    public function getPathAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
