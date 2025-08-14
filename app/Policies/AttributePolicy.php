<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Attribute;
use Illuminate\Auth\Access\Response;

class AttributePolicy
{
    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('viewAny Attribute')
            ? Response::allow()
            : Response::deny('You do not have permission to view attributes.');
    }

    public function view(User $user, Attribute $attribute)
    {
        return $user->hasPermissionTo('view Attribute')
            ? Response::allow()
            : Response::deny('You do not have permission to view this attribute.');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create Attribute')
            ? Response::allow()
            : Response::deny('You do not have permission to create an attribute.');
    }

    public function update(User $user, Attribute $attribute)
    {
        return $user->hasPermissionTo('update Attribute')
            ? Response::allow()
            : Response::deny('You do not have permission to update this attribute.');
    }

    public function delete(User $user, Attribute $attribute)
    {
        return $user->hasPermissionTo('delete Attribute')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this attribute.');
    }

    public function restore(User $user, Attribute $attribute)
    {
        return $user->hasPermissionTo('restore Attribute')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this attribute.');
    }

    public function forceDelete(User $user, Attribute $attribute)
    {
        return $user->hasPermissionTo('forceDelete Attribute')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this attribute.');
    }
}
