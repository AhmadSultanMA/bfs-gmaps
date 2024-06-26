<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $location = new Location();
        $location->name = $request->input('nama');
        $location->lat = $request->input('lat');
        $location->lng = $request->input('lng');
        $location->description = $request->input('description');
        $location->save();

        return redirect()->route('dashboard')
            ->with('success', 'Location created successfully.');
    }
}
