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
        Schema::create('monitoring', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tim_id'); // relasi ke tim
            $table->date('tanggal');
            $table->unsignedBigInteger('id_pendaftaran'); // relasi ke reklame

            $table->string('tim_st'); // simpan ID user gabungan seperti "1,3,4"

            $table->enum('cek_lapangan', ['sudah', 'belum'])->nullable();
            $table->enum('status', ['berlaku', 'tidak berlaku'])->nullable();
            $table->enum('keberadaan_reklame', ['ada', 'tidak ada'])->nullable();
            $table->enum('kelayakan_kontruksi', ['layak', 'tidak layak', '-'])->nullable();
            $table->enum('kesesuaian', ['sesuai', 'tidak sesuai', '-'])->nullable();

            $table->text('catatan')->nullable();
            $table->enum('tl', ['ya', 'tidak']);

            $table->timestamps();

            // Foreign keys
            $table->foreign('tim_id')->references('id')->on('tim')->onDelete('cascade');
            $table->foreign('id_pendaftaran')->references('id')->on('reklame')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring');
    }
};
