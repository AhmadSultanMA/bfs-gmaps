<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        return Inertia::render('Dashboard', [
            'locations' => $locations,
        ]);
    }

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
