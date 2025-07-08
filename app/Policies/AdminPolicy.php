<?php
namespace App\Policies;

use App\Models\User;

class AdminPolicy
{
    /**
     * Determine if the user can access admin dashboard.
     */
    public function access(User $user): bool
    {
        return $user->isAdmin();
    }
}
