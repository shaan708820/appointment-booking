package com.example.appointment_booking;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*") // Crucial: Allows your frontend to talk to this backend
public class AppointmentController {
    
    // In-memory storage for simplicity (resets when you restart the app)
    private List<Appointment> appointments = new ArrayList<>();

    @PostMapping
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        appointments.add(appointment);
        return appointment;
    }

    @GetMapping
    public List<Appointment> getAppointments() {
        return appointments;
    }
}