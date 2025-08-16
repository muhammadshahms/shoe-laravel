<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Banner extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'type',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = ['banner_image'];

    // Spatie media collection
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('banner')
            ->singleFile()
            ->useFallbackUrl('/images/default-banner.png'); // fallback jab koi image na ho
    }

    // Accessor for banner_image
    public function getBannerImageAttribute(): string
    {
        return $this->getFirstMediaUrl('banner') ?: '/images/default-banner.png';
    }
}
