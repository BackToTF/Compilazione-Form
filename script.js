document.addEventListener('DOMContentLoaded', function() {
    // Select all button containers
    const buttonContainers = document.querySelectorAll('.button-container');

    // Loop through each container and add a button
    buttonContainers.forEach((container, index) => {
        const button = document.createElement('button');
        button.textContent = `Show Table ${index + 1}`;
        button.className = 'btn btn-primary mt-2';
        button.addEventListener('click', function() {
            createTable(container, index + 1);
        });
        container.appendChild(button);
    });
});

function createTable(container, index) {
    // Remove existing table if any
    const existingTable = container.querySelector('table');
    if (existingTable) {
        existingTable.remove();
    }

    // Create table
    const table = document.createElement('table');
    table.className = 'table table-bordered mt-2';

    // Create table body
    const tbody = document.createElement('tbody');

    // Add rows and columns
    for (let i = 0; i < index; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < index; j++) {
            const cell = document.createElement('td');
            cell.appendChild(createForm(`form_${i}_${j}`));
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

function createForm(formId) {
    const form = document.createElement('form');
    form.id = formId;
    form.className = 'p-2';

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'tel' }
    ];

    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'mb-2';

        const label = document.createElement('label');
        label.htmlFor = `${formId}_${field.name}`;
        label.className = 'form-label';
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = field.type;
        input.id = `${formId}_${field.name}`;
        input.name = field.name;
        input.className = 'form-control form-control-sm';

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-sm btn-success';
    submitButton.textContent = 'Submit';

    form.appendChild(submitButton);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        alert(`Form ${formId} submitted with data:\n${[...formData.entries()].map(([key, value]) => `${key}: ${value}`).join('\n')}`);
    });

    return form;
}