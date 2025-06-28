<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attribute;
use App\Models\AttributeOption;

class AttributeOptionSeeder extends Seeder
{
    public function run(): void
    {
        $colorAttribute = Attribute::where('code', 'color')->first();
        $sizeAttribute = Attribute::where('code', 'size')->first();

        if ($colorAttribute) {
            $colors = [
                ['value' => 'red', 'label' => 'Red'],
                ['value' => 'blue', 'label' => 'Blue'],
                ['value' => 'green', 'label' => 'Green'],
            ];

            foreach ($colors as $option) {
                $colorAttribute->options()->create($option);
            }
        }

        if ($sizeAttribute) {
            $sizes = [
                ['value' => 'S', 'label' => 'Small'],
                ['value' => 'M', 'label' => 'Medium'],
                ['value' => 'L', 'label' => 'Large'],
            ];

            foreach ($sizes as $option) {
                $sizeAttribute->options()->create($option);
            }
        }
    }
}
