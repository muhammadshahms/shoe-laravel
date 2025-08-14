<?php

namespace App\Policies;

use App\Models\User;

class AdminPolicy
{
    /**
     * Determine whether the user can view the dashboard.
     */
    public function dashboard(User $user): bool
    {

        return $user->hasRole('admin');

    }

    /**
     * Determine whether the user can view the profile.
     */
    public function profile(User $user): bool
    {
        return $user->hasRole('admin');
    }


    public function password(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can view the appearance.
     */

}
