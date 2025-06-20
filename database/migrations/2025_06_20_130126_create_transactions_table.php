<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('payment_method_id')->nullable()->constrained()->nullOnDelete();

            $table->string('transaction_id')->nullable(); // from payment gateway
            $table->decimal('amount', 10, 2);
            $table->string('currency', 10)->default('USD');

            $table->string('status')->default('pending'); // pending, success, failed, refunded, etc.
            $table->json('response')->nullable(); // full gateway response for record/debug

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
