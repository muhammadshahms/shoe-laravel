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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // ✅ User details
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('is_guest')->default(false);

            // ✅ Order info
            $table->string('order_number')->unique();
            $table->string('status')->default('pending');
            $table->decimal('grand_total', 10, 2)->default(0);
            $table->integer('item_count')->default(0);

            // ✅ Payment
            $table->string('payment_status')->nullable();
            $table->string('payment_method')->nullable();

            // ✅ Shipping
            $table->string('shipping_full_name')->nullable();
            $table->string('shipping_address')->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_state')->nullable();
            $table->string('shipping_zip_code')->nullable();
            $table->string('shipping_country')->nullable();
            $table->string('shipping_phone')->nullable();

            // ✅ Billing
            $table->string('billing_full_name')->nullable();
            $table->string('billing_email')->nullable();
            $table->string('billing_address')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_zip_code')->nullable();
            $table->string('billing_country')->nullable();
            $table->string('billing_phone')->nullable();

            // ✅ Other
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes(); // For SoftDeletes trait
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
