<?php

// app/Models/Banner.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Banner extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'description',
        "start_date",
        "end_date",
        "type",
        'is_active'
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];

    //spatie media
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('banner')
            ->singleFile()
            ->useFallbackUrl('/images/default-brand.png');
    }
}
