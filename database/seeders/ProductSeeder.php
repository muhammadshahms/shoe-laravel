<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory(20)->create()->each(function ($product) {
            $categories = Category::inRandomOrder()->take(rand(1,2))->pluck('id')->toArray();
            $product->categories()->sync($categories);
        });
    }
}
