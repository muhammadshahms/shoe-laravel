<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id(); // this is an unsigned BIGINT by default
            $table->string('name');
            $table->string('code')->unique();
            $table->string('type'); // e.g., text, select, multiselect
            $table->boolean('is_filterable')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
