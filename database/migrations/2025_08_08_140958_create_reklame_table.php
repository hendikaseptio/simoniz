<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reklame', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_pendaftaran');
            $table->unsignedBigInteger('prev_id_pendaftaran')->nullable();
            $table->enum('monitoring',['iya','tidak','kosong']);
            $table->enum('perpanjangan',['sudah','belum','kosong']);
            $table->string('nama_pemohon');
            $table->text('alamat_pemohon');
            $table->string('nama_perusahaan');
            $table->text('alamat_perusahaan');
            $table->string('jalan');
            $table->text('isi_konten');
            $table->date('tgl_penetapan');
            $table->date('tgl_selesai_penetapan');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('lokasi')->nullable();
            $table->string('foto_reklame')->nullable();
            $table->string('no_hp_pemohon');
            $table->string('jenis_reklame');
            $table->integer('jumlah_sisi');
            $table->text('keterangan_lokasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reklame');
    }
};
