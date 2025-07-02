<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('breadcrumbs', function () {
            $segments = Request::segments();
            $breadcrumbs = [];
            $url = '';

            foreach ($segments as $segment) {
                $url .= '/' . $segment;
                $breadcrumbs[] = [
                    'title' => ucfirst(str_replace('-', ' ', $segment)),
                    'href' => $url,
                ];
            }

            return $breadcrumbs;
        });
    }
}
