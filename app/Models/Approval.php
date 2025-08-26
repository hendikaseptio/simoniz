<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    protected $table = 'approval_dokumen';

    protected $fillable = [
        'dokumen_id',
        'tanggal_approval',
        'status',
        'catatan',
    ];

    public function dokumen()
    {
        return $this->belongsTo(Dokumen::class);
    }
}
