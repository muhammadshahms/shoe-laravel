<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Banner;
use Illuminate\Auth\Access\Response;

class BannerPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny Banner')
            ? Response::allow()
            : Response::deny('You do not have permission to view banners.');
    }

    public function view(User $user, Banner $banner) {
        return $user->hasPermissionTo('view Banner')
            ? Response::allow()
            : Response::deny('You do not have permission to view this banner.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create Banner')
            ? Response::allow()
            : Response::deny('You do not have permission to create a banner.');
    }

    public function update(User $user, Banner $banner) {
        return $user->hasPermissionTo('update Banner')
            ? Response::allow()
            : Response::deny('You do not have permission to update this banner.');
    }

    public function delete(User $user, Banner $banner) {
        return $user->hasPermissionTo('delete Banner')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this banner.');
    }

    public function restore(User $user, Banner $banner) {
        return $user->hasPermissionTo('restore Banner')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this banner.');
    }

    public function forceDelete(User $user, Banner $banner) {
        return $user->hasPermissionTo('forceDelete Banner')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this banner.');
    }
}
