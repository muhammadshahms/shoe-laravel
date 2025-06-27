<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia, HasSlug;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'sku',
        'barcode',
        'brand_id',
        'price',
        'special_price',
        'special_price_start',
        'special_price_end',
        'quantity',
        'in_stock',
        'is_active',
        'is_featured',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'weight',
        'dimensions'
    ];

    protected $casts = [
        'special_price_start' => 'datetime',
        'special_price_end' => 'datetime',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'in_stock' => 'boolean',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function variations()
    {
        return $this->hasMany(ProductVariation::class);
    }

    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('main_image')
            ->singleFile()
            ->useFallbackUrl('/images/default-product.png');

        $this->addMediaCollection('gallery');
    }

    public function getCurrentPriceAttribute()
    {
        if ($this->special_price && now()->between($this->special_price_start, $this->special_price_end)) {
            return $this->special_price;
        }
        return $this->price;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}