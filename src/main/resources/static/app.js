const API_URL = 'api/appointments';
const form = document.getElementById('appointmentForm');
const list = document.getElementById('appointmentList');

// Fetch and display appointments as soon as the page loads
document.addEventListener('DOMContentLoaded', fetchAppointments);

// Handle the form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newAppointment = {
        patientName: document.getElementById('patientName').value,
        doctorName: document.getElementById('doctorName').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAppointment)
        });

        if (response.ok) {
            form.reset();
            fetchAppointments(); // Refresh the list
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Could not connect to the backend server. Is Spring Boot running?');
    }
});

// Function to get data from Java and display it
async function fetchAppointments() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        list.innerHTML = '';
        data.forEach(apt => {
            const li = document.createElement('li');
            li.className = 'appointment-card';
            li.innerHTML = `
                <h4>${apt.patientName}</h4>
                <p><strong>Doctor:</strong> ${apt.doctorName}</p>
                <p><strong>When:</strong> ${apt.date} at ${apt.time}</p>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}