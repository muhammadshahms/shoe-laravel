<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attribute;

class AttributeSeeder extends Seeder
{
    public function run(): void
    {
        $attributes = [
            [
                'name' => 'Color',
                'code' => 'color',
                'type' => 'select',
                'is_filterable' => true,
            ],
            [
                'name' => 'Size',
                'code' => 'size',
                'type' => 'select',
                'is_filterable' => true,
            ],
            [
                'name' => 'Brand',
                'code' => 'brand',
                'type' => 'text',
                'is_filterable' => false,
            ],
        ];

        foreach ($attributes as $attr) {
            Attribute::create($attr);
        }
    }
}
