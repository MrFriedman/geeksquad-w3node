"use client";

import { useState, useEffect, useCallback } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeofenceOptions {
  targetLat: number;
  targetLng: number;
  radiusMeters?: number;
  enableMockLocation?: boolean;
  mockCoordinates?: Coordinates;
}

interface GeofenceResult {
  isWithinRange: boolean;
  distance: number;
  userLocation: Coordinates | null;
  error: string | null;
  isMockMode: boolean;
}

/**
 * Hook to check if user is within geofence radius of a target location
 * @param options Geofence configuration
 * @returns Geofence state and controls
 */
export function useGeofence(options: GeofenceOptions) {
  const {
    targetLat,
    targetLng,
    radiusMeters = 50,
    enableMockLocation = false,
    mockCoordinates,
  } = options;

  const [result, setResult] = useState<GeofenceResult>({
    isWithinRange: false,
    distance: Infinity,
    userLocation: null,
    error: null,
    isMockMode: enableMockLocation,
  });

  const [isMockEnabled, setIsMockEnabled] = useState(enableMockLocation);
  const [mockLocation, setMockLocation] = useState<Coordinates | null>(
    mockCoordinates || null
  );

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Distance in meters
    },
    []
  );

  // Get user's current location
  const getCurrentLocation = useCallback((): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  // Check geofence status
  const checkGeofence = useCallback(async () => {
    try {
      let userLocation: Coordinates;

      if (isMockEnabled && mockLocation) {
        // Use mock location
        userLocation = mockLocation;
      } else {
        // Get real location
        userLocation = await getCurrentLocation();
      }

      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        targetLat,
        targetLng
      );

      const isWithinRange = distance <= radiusMeters;

      setResult({
        isWithinRange,
        distance: Math.round(distance),
        userLocation,
        error: null,
        isMockMode: isMockEnabled,
      });
    } catch (error) {
      setResult((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, [
    isMockEnabled,
    mockLocation,
    targetLat,
    targetLng,
    radiusMeters,
    calculateDistance,
    getCurrentLocation,
  ]);

  // Watch position (continuous updates)
  const watchPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setResult((prev) => ({
        ...prev,
        error: "Geolocation is not supported",
      }));
      return () => {};
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLocation: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        if (!isMockEnabled) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            targetLat,
            targetLng
          );

          const isWithinRange = distance <= radiusMeters;

          setResult({
            isWithinRange,
            distance: Math.round(distance),
            userLocation,
            error: null,
            isMockMode: false,
          });
        }
      },
      (error) => {
        setResult((prev) => ({
          ...prev,
          error: `Geolocation error: ${error.message}`,
        }));
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [
    isMockEnabled,
    targetLat,
    targetLng,
    radiusMeters,
    calculateDistance,
  ]);

  // Toggle mock location
  const toggleMockLocation = useCallback((enabled: boolean) => {
    setIsMockEnabled(enabled);
  }, []);

  // Set mock coordinates
  const setMockCoordinates = useCallback((coords: Coordinates) => {
    setMockLocation(coords);
    setIsMockEnabled(true);
  }, []);

  // Initial check
  useEffect(() => {
    checkGeofence();
  }, [checkGeofence]);

  return {
    ...result,
    checkGeofence,
    watchPosition,
    toggleMockLocation,
    setMockCoordinates,
    isMockEnabled,
  };
}
