<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();

            $table->string('status')->default('pending');
            $table->decimal('grand_total', 10, 2);
            $table->integer('item_count')->default(0);

            $table->string('payment_status')->default('unpaid'); // e.g., unpaid, paid
            $table->string('payment_method')->nullable(); // e.g., COD, card, etc.

            // Shipping Info
            $table->string('shipping_full_name');
            $table->text('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_state')->nullable();
            $table->string('shipping_zip_code')->nullable();
            $table->string('shipping_country');
            $table->string('shipping_phone');

            // Billing Info
            $table->string('billing_full_name');
            $table->text('billing_address');
            $table->string('billing_city');
            $table->string('billing_state')->nullable();
            $table->string('billing_zip_code')->nullable();
            $table->string('billing_country');
            $table->string('billing_phone');

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
