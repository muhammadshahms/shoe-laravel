<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeController extends Controller
{
    public function index()
    {
        $attributes = Attribute::withCount('options')->get();

        return Inertia::render('Attributes/Index', [
            'attributes' => $attributes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Attributes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $validated['code'] = Str::slug($validated['name']);

        Attribute::create($validated);

        return redirect()->route('attributes.index')->with('success', 'Attribute created.');
    }

    public function edit(Attribute $attribute)
    {
        return Inertia::render('Attributes/Edit', [
            'attribute' => $attribute,
        ]);
    }

    public function update(Request $request, Attribute $attribute)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $validated['code'] = Str::slug($validated['name']);

        $attribute->update($validated);

        return redirect()->route('attributes.index')->with('success', 'Attribute updated.');
    }

    public function destroy(Attribute $attribute)
    {
        $attribute->delete();

        return redirect()->route('attributes.index')->with('success', 'Attribute deleted.');
    }
}
