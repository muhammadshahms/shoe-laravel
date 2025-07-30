<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // User or Guest
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('is_guest')->default(false);

            // Order Info
            $table->string('order_number')->unique();
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending');
            $table->float('grand_total');
            $table->unsignedInteger('item_count');

            // Payment
            $table->string('payment_status')->nullable();
            $table->string('payment_method')->nullable();

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
            $table->string('billing_email');
            $table->text('billing_address');
            $table->string('billing_city');
            $table->string('billing_state')->nullable();
            $table->string('billing_zip_code')->nullable();
            $table->string('billing_country');
            $table->string('billing_phone');

            // Other
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
