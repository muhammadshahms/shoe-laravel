<?php

namespace App\Providers;

use App\Models\User;
use App\Policies\AdminPolicy;
use Illuminate\Support\Facades\Gate;
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

        Gate::policy(User::class, AdminPolicy::class);
        
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
