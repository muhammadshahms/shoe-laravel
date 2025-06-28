<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('slug')->unique();

            $table->text('description')->nullable();
            $table->text('short_description')->nullable();

            $table->string('sku')->unique()->nullable();
            $table->string('barcode')->nullable();

            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();

            $table->decimal('price', 10, 2);
            $table->decimal('special_price', 10, 2)->nullable();
            $table->timestamp('special_price_start')->nullable();
            $table->timestamp('special_price_end')->nullable();

            $table->integer('quantity')->default(0);
            $table->boolean('in_stock')->default(true);

            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);

            // SEO fields
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();

            // Physical properties
            $table->string('weight')->nullable(); // e.g., in KG or LB
            $table->string('dimensions')->nullable(); // e.g., "10x20x15 cm"

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
