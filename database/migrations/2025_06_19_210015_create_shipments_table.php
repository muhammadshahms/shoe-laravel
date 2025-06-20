<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')->constrained()->onDelete('cascade');

            $table->string('tracking_number')->nullable();
            $table->string('carrier')->nullable(); // e.g., DHL, FedEx, UPS
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('estimated_delivery')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->string('status')->default('pending'); // pending, shipped, delivered, etc.

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
