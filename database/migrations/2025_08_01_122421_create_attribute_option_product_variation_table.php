<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('attribute_option_product_variation', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attribute_option_id')->constrained()->cascadeOnDelete();
            $table->unique(['product_variation_id', 'attribute_option_id'], 'attribute_option_variation_unique');
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('attribute_option_product_variation');
    }
};

