<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $brands = Brand::all();
        $categories = Category::all();

        if ($brands->count() === 0 || $categories->count() === 0) {
            $this->command->warn('Please seed brands and categories before running ProductSeeder.');
            return;
        }

        // Generate 30 shoe products
        for ($i = 1; $i <= 30; $i++) {
            $name = $faker->randomElement(['Running Shoes', 'Sneakers', 'Formal Shoes', 'Boots', 'Slippers', 'Sandals']) . ' ' . $faker->colorName;
            $sku = 'SHOE-' . strtoupper(Str::random(6));
            $barcode = strtoupper(Str::random(12));

            $data = [
                'name' => $name,
                'description' => $faker->paragraph,
                'short_description' => $faker->sentence,
                'sku' => $sku,
                'barcode' => $barcode,
                'price' => $faker->numberBetween(2000, 8000),
                'special_price' => $faker->optional()->numberBetween(1500, 7000),
                'special_price_start' => now()->subDays(rand(1, 10)),
                'special_price_end' => now()->addDays(rand(5, 15)),
                'quantity' => $faker->numberBetween(10, 200),
                'in_stock' => true,
                'is_active' => true,
                'is_featured' => $faker->boolean(30),
                'meta_title' => $name,
                'meta_description' => $faker->sentence,
                'meta_keywords' => 'shoes, ' . strtolower($name),
                'weight' => $faker->numberBetween(500, 1200) . 'g',
                'dimensions' => $faker->numberBetween(20, 40) . 'x' . $faker->numberBetween(10, 20) . 'x' . $faker->numberBetween(5, 15),
                'brand_id' => $brands->random()->id,
            ];

            $product = Product::create($data);

            // Attach 1-3 random categories
            $product->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
