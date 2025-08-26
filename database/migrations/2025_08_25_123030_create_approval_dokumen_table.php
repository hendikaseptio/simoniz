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
        Schema::create('approval_dokumen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dokumen_id')->constrained('dokumen')->onDelete('cascade');
            $table->date('tanggal_approval')->nullable();
            $table->enum('status', ['setuju','tidak setuju'])->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approval_dokumen');
    }
};
