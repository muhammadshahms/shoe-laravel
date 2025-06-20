<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('seos', function (Blueprint $table) {
            $table->id();

            // Polymorphic relation
            $table->string('seoable_type');
            $table->unsignedBigInteger('seoable_id');

            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->string('canonical_url')->nullable();

            // Open Graph
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();

            // Twitter Card
            $table->string('twitter_title')->nullable();
            $table->text('twitter_description')->nullable();
            $table->string('twitter_image')->nullable();

            // Schema Markup (JSON-LD etc.)
            $table->longText('schema_markup')->nullable();

            $table->timestamps();

            // Optional: index for performance
            $table->index(['seoable_type', 'seoable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seos');
    }
};
