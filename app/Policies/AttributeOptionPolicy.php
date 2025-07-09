<?php

namespace App\Policies;

use App\Models\User;
use App\Models\AttributeOption;
use Illuminate\Auth\Access\Response;

class AttributeOptionPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('viewAny AttributeOption')
            ? Response::allow()
            : Response::deny('You do not have permission to view attribute options.');
    }

    public function view(User $user, AttributeOption $attributeOption)
    {
        return $user->hasPermissionTo('view AttributeOption')
            ? Response::allow()
            : Response::deny('You do not have permission to view this attribute option.');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create AttributeOption')
            ? Response::allow()
            : Response::deny('You do not have permission to create an attribute option.');
    }

    public function update(User $user, AttributeOption $attributeOption)
    {
        return $user->hasPermissionTo('update AttributeOption')
            ? Response::allow()
            : Response::deny('You do not have permission to update this attribute option.');
    }

    public function delete(User $user, AttributeOption $attributeOption)
    {
        return $user->hasPermissionTo('delete AttributeOption')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this attribute option.');
    }

    public function restore(User $user, AttributeOption $attributeOption)
    {
        return $user->hasPermissionTo('restore AttributeOption')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this attribute option.');
    }

    public function forceDelete(User $user, AttributeOption $attributeOption)
    {
        return $user->hasPermissionTo('forceDelete AttributeOption')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this attribute option.');
    }
}
