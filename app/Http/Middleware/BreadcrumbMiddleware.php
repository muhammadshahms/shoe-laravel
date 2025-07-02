<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BreadcrumbMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $segments = $request->segments();
        $breadcrumbs = [];
        $url = '';

        $map = [
            'dashboard' => 'Dashboard',
            'categories' => 'Categories',
            'tree' => 'Tree View',
        ];

        foreach ($segments as $segment) {
            $url .= '/' . $segment;
            $breadcrumbs[] = [
                'title' => $map[$segment] ?? ucfirst(str_replace('-', ' ', $segment)),
                'href' => $url,
            ];
        }

        Inertia::share('breadcrumbs', $breadcrumbs);

        return $next($request);
    }
}
