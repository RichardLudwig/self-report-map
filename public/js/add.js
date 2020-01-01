const reportForm = document.getElementById('report-form');
const reportCrime = document.getElementById('report-crime');
const reportAddress = document.getElementById('report-address');
const reportTime = document.getElementById('report-time');
const reportDate = document.getElementById('report-date');
const reportMessage = document.getElementById('report-message');

// send POST to API to add report
async function addReport(e) {
  e.preventDefault();

  if (reportCrime === '' || reportAddress === '') {
    alert('Please fill in fields');
  }

  const sendBody = {
    crime: reportCrime.value,
    address: reportAddress.value,
    time: reportTime.value,
    date: reportDate.value,
    message: reportMessage.value
  }

  try {
    const res = await fetch('/api/v1/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Report already exists');
    }

    alert('Report added!');
    window.location.href = '/index.html';

  } catch (error) {
    alert(error);

    return;
  }
}

reportForm.addEventListener('submit', addReport);