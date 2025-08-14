<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Brand;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph,
            'short_description' => $this->faker->sentence,
            'sku' => strtoupper($this->faker->bothify('SKU-####')),
            'barcode' => strtoupper($this->faker->bothify('BARCODE-######')),
            'brand_id' => Brand::inRandomOrder()->first()?->id,
            'price' => $this->faker->randomFloat(2, 3000, 15000),
            'special_price' => $this->faker->optional()->randomFloat(2, 2000, 12000),
            'special_price_start' => now(),
            'special_price_end' => now()->addDays(10),
            'quantity' => $this->faker->numberBetween(0, 100),
            'in_stock' => true,
            'is_active' => true,
            'is_featured' => $this->faker->boolean,
            'meta_title' => $this->faker->sentence,
            'meta_description' => $this->faker->paragraph,
            'meta_keywords' => implode(',', $this->faker->words(5)),
            'weight' => $this->faker->randomFloat(2, 0.5, 1.5) . ' kg',
            'dimensions' => $this->faker->numberBetween(20,30) . 'x' . $this->faker->numberBetween(10,15) . 'x' . $this->faker->numberBetween(5,10) . ' cm',
        ];
    }
}
