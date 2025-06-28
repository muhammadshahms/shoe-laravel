<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\AttributeOption;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeOptionController extends Controller
{
    public function index(Attribute $attribute)
    {
        $options = $attribute->options()->get();

        return Inertia::render('AttributeOptions/Index', [
            'attribute' => $attribute,
            'options' => $options,
        ]);
    }

    public function create(Attribute $attribute)
    {
        return Inertia::render('AttributeOptions/Create', [
            'attribute' => $attribute,
        ]);
    }

    public function store(Request $request, Attribute $attribute)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);

        $attribute->options()->create($validated);

        return redirect()->route('attributes.options.index', $attribute->id)
            ->with('success', 'Option created.');
    }

    public function edit(Attribute $attribute, AttributeOption $option)
    {
        return Inertia::render('AttributeOptions/Edit', [
            'attribute' => $attribute,
            'option' => $option,
        ]);
    }

    public function update(Request $request, Attribute $attribute, AttributeOption $option)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);

        $option->update($validated);

        return redirect()->route('attributes.options.index', $attribute->id)
            ->with('success', 'Option updated.');
    }

    public function destroy(Attribute $attribute, AttributeOption $option)
    {
        $option->delete();

        return redirect()->route('attributes.options.index', $attribute->id)
            ->with('success', 'Option deleted.');
    }
}
