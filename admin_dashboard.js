(function($) {
    "use strict";

    // --- Global Data Stores (Mock Data) ---
    let employees = [
        { id: 'emp_001', name: 'Kirti Agrawal', designation: 'Manager', department: 'Sales', organizations: ['ORG001'], processes: ['PROC001'], isActive: true, username: 'kirti.a', password: 'password123', role: 'employee', location: 'Delhi', langKnown: 'Hindi, English', employeeType: 'On Role' },
        { id: 'emp_002', name: 'Harpreet Kaur', designation: 'Analyst', department: 'Marketing', organizations: ['ORG002'], processes: ['PROC002'], isActive: true, username: 'harpreet.k', password: 'password123', role: 'employee', location: 'Mumbai', langKnown: 'English, Punjabi', employeeType: 'Consultant' },
        { id: 'emp_003', name: 'Chandani', designation: 'Developer', department: 'IT', organizations: ['ORG001', 'ORG002'], processes: ['PROC001', 'PROC003'], isActive: false, username: null, password: null, role: null, location: 'Bangalore', langKnown: 'Hindi, English', employeeType: 'Intern - Short Term' },
        { id: 'emp_004', name: 'Raj Patel', designation: 'Sales Rep', department: 'Sales', organizations: ['ORG002'], processes: ['PROC002'], isActive: true, username: null, password: null, role: null, location: 'Gujarat', langKnown: 'Gujarati, English', employeeType: 'On Role' },
        { id: 'admin_account', name: 'Admin', designation: '--', department: '--', organizations: [], processes: [], isActive: true, username: 'admin', password: 'adminpassword', role: 'admin', location: 'Headquarters', langKnown: 'English', employeeType: 'On Role' }
    ];

    let organizations = [
        { _id: 'ORG001', name: 'Legrand', isActive: true },
        { _id: 'ORG002', name: 'Accutech', isActive: true },
        { _id: 'ORG003', name: 'Global Corp', isActive: false }
    ];

    let processes = [
        { _id: 'PROC001', name: 'Legrand_CRM', organizationId: 'ORG001', isActive: true },
        { _id: 'PROC002', name: 'Numeric_AMC', organizationId: 'ORG002', isActive: true },
        { _id: 'PROC003', name: 'Numeric_Product', organizationId: 'ORG002', isActive: false }
    ];

    let campaigns = [
        { _id: 'CAMP001', name: 'Bulk order', organizationId: 'ORG001', processId: 'PROC001', isActive: true },
        { _id: 'CAMP002', name: 'Home Automation', organizationId: 'ORG001', processId: 'PROC001', isActive: true },
        { _id: 'CAMP003', name: 'Legrand_eShop', organizationId: 'ORG002', processId: 'PROC002', isActive: false }
    ];

    let allTasksData = [
        {
            id: 'TID001', taskDate: '2025-07-17', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Initial task for Q3 sales.', isActive: true,
            leads: { dateFrom: '2025-07-01', dateTo: '2025-07-05', month: 'Jul-2025', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 100, convertToProspects: 10, comment: 'Initial lead engagement', assignments: ['date-2025-07-01-2025-07-05', 'month-Jul-2025', 'region-North', 'campaign-CAMP001'] },
            prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID002', taskDate: '2025-07-16', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'Under process', generalComment: 'Follow up on product inquiries.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-06', dateTo: '2025-07-10', month: 'Jul-2025', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToWon: 2, employeeSaleTarget: 250000, comment: 'Client signed up.', assignments: ['date-2025-07-06-2025-07-10', 'month-Jul-2025', 'region-East', 'campaign-CAMP003'] },
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 125000
        },
        {
            id: 'TID003', taskDate: '2025-07-18', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_003', status: 'Completed', generalComment: 'CRM system update analysis.', isActive: false,
            leads: { dateFrom: '2025-06-15', dateTo: '2025-06-20', month: 'Jun-2025', year: '2025', region: 'South', campaign: 'CAMP002', quantity: 50, convertToProspects: 5, comment: 'Reviewed current CRM usage.' , assignments: ['date-2025-06-15-2025-06-20', 'month-Jun-2025', 'region-South', 'campaign-CAMP002']},
            prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID004', taskDate: '2025-07-15', organization: 'ORG002', process: 'PROC003', assignedToEmployee: 'emp_004', status: 'Overdue', generalComment: 'Launch new product line campaign.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-01', dateTo: '2025-07-07', month: 'Jul-2025', year: '2025', region: 'West', campaign: 'CAMP003', quantity: 15, convertToWon: 3, employeeSaleTarget: 300000, comment: 'Awaiting final creative assets.' , assignments: ['date-2025-07-01-2025-07-07', 'month-Jul-2025', 'region-West', 'campaign-CAMP003']},
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 100000
        },
        {
            id: 'TID005', taskDate: '2025-07-19', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Follow up on key accounts in North region.', isActive: true,
            leads: { dateFrom: '2025-07-10', dateTo: '2025-07-15', month: 'Jul-2025', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 75, convertToProspects: 8, comment: 'Initial contact made with 5 accounts.', assignments: ['date-2025-07-10-2025-07-15', 'month-Jul-2025', 'region-North', 'campaign-CAMP001'] },
            prospects: null, activeLeadsToProspects: 2, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID006', taskDate: '2025-07-20', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'Under process', generalComment: 'Analyze market trends for Q3.', isActive: true,
                leads: null,
                prospects: { dateFrom: '2025-07-15', dateTo: '2025-07-20', month: 'Jul-2025', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 8, convertToWon: 1, employeeSaleTarget: 150000, comment: 'Gathering data, preliminary findings positive.' , assignments: ['date-2025-07-15-2025-07-20', 'month-Jul-2025', 'region-East', 'campaign-CAMP003'] },
                activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0
            }
    ];

    let hourlyUpdatesAdmin = [
        { date: '2025-07-30', timeSlot: '09:30AM-10:30AM', employeeId: 'emp_001', processId: 'PROC001', calls: 5, prospects: 2, wonCases: 1, sales: 50000 },
        { date: '2025-07-30', timeSlot: '10:30AM-11:30AM', employeeId: 'emp_001', processId: 'PROC001', calls: 10, prospects: 3, wonCases: 0, sales: 0 },
        { date: '2025-07-30', timeSlot: '11:30AM-12:30PM', employeeId: 'emp_002', processId: 'PROC002', calls: 8, prospects: 1, wonCases: 0, sales: 0 },
        { date: '2025-07-31', timeSlot: '09:30AM-10:30AM', employeeId: 'emp_001', processId: 'PROC001', calls: 7, prospects: 2, wonCases: 0, sales: 10000 }
    ];

    let allocatedTasksData = [
        { id: 'ATID001', assignedTo: 'emp_001', assignedDate: '2025-07-25', taskCompletedDate: null, dueDate: '2025-07-30', task: 'Prepare weekly sales report.', remark: 'Started working on it.', status: 'Under process', isActive: true },
        { id: 'ATID002', assignedTo: 'emp_002', assignedDate: '2025-07-25', taskCompletedDate: '2025-07-28', dueDate: '2025-07-28', task: 'Follow up with client X.', remark: 'Client signed up.', status: 'Completed', isActive: true },
        { id: 'ATID003', assignedTo: 'emp_001', assignedDate: '2025-07-20', taskCompletedDate: null, dueDate: '2025-07-26', task: 'Review Q2 performance.', remark: 'Pending review.', status: 'Pending', isActive: true }
    ];

    let currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', campaign: '', status: '' };
    let editingEmployeeLogin = null;
    let editingProfile = null;

    // --- Caching DOM Elements ---
    const elements = {
        mainNavbar: $('#main-admin-navbar'),
        employeesTableBody: $('#employeesTableBody'),
        employeeMasterTableBody: $('#employeeMasterTableBody'),
        organizationsTableBody: $('#organizationsTableBody'),
        processesTableBody: $('#processesTableBody'),
        campaignsTableBody: $('#campaignsTableBody'),
        allTasksTableBody: $('#allTasksTableBody'),
        filteredTasksTableBody: $('#filteredTasksTableBody'),
        hourlyUpdatesAdminTableBody: $('#hourlyUpdatesAdminTableBody'),
        allocatedTasksTableBody: $('#allocatedTasksTableBody'),
        taskOrganizationSelect: $('#taskOrganizationSelect'),
        taskProcessSelect: $('#taskProcessSelect'),
        taskEmployeeSelect: $('#taskEmployeeSelect'),
        leadsQuantityCampaignMaster: $('#leadsQuantityCampaignMaster'),
        prospectsQuantityCampaignMaster: $('#prospectsQuantityCampaignMaster'),
        editOrganization: $('#editOrganization'),
        editProcess: $('#editProcess'),
        editEmployee: $('#editEmployee'),
        editLeadsCampaign: $('#editLeadsCampaign'),
        editProspectsCampaign: $('#editProspectsCampaign'),
        editAllocatedTaskEmployeeSelect: $('#editAllocatedTaskEmployeeSelect'),
        filterOrganization: $('#filterOrganization'),
        filterProcess: $('#filterProcess'),
        filterEmployee: $('#filterEmployee'),
        filterCampaign: $('#filterCampaign'),
        filterStatus: $('#filterStatus'),
        universalTaskSearchInput: $('#universalTaskSearchInput'),
        viewTaskSearchInput: $('#viewTaskSearchInput'),
        universalFilterForm: $('#universalFilterForm'),
        filterOffcanvas: $('#filterOffcanvas'),
        allocateEmployeeSelect: $('#allocateEmployeeSelect'),
        employeeOrganizationSelect: $('#employeeOrganizationSelect'),
        employeeProcessSelect: $('#employeeProcessSelect'),
        loginEmployeeId: $('#loginEmployeeId')
    };

    // --- Helper Functions ---

    function parseDate(dateStr) {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return null;
    }

    function formatDateToISO(dateStr) {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return null;
    }

    function getStatusBadge(status) {
        let badgeClass = 'bg-secondary';
        switch (status) {
            case 'Pending': badgeClass = 'bg-warning text-dark'; break;
            case 'Under process': badgeClass = 'bg-info text-dark'; break;
            case 'Completed': badgeClass = 'bg-success'; break;
            case 'On hold': badgeClass = 'bg-danger'; break;
            case 'Overdue': badgeClass = 'bg-danger'; break;
        }
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }

    async function makeAuthRequest(url, method = 'POST', data = null) {
        console.log(`Mock API Call: ${method} ${url}`, data);
        return new Promise(resolve => {
            setTimeout(() => {
                let responseData = null;
                if (url.includes('/admin/employees_full')) {
                    if (method === 'POST') {
                        const newEmp = { ...data, organizations: data.organizations || [], processes: data.processes || [], isActive: true, username: null, password: null, role: null };
                        employees.push(newEmp);
                        responseData = newEmp;
                    } else if (method === 'PUT') {
                        const empIndex = employees.findIndex(e => e.id === data.id);
                        if empIndex !== -1) {
                            employees[empIndex] = { ...employees[empIndex], ...data };
                            responseData = employees[empIndex];
                        }
                    }
                }
                resolve(responseData);
            }, 300);
        });
    }

    function populateDropdown(dropdown, dataArray, valueKey, textKey, defaultOptionText = 'Select', hasAllOption = false) {
        if (!dropdown.length) {
            console.warn("Dropdown element not found:", dropdown.selector);
            return;
        }
        const currentVal = dropdown.val();
        dropdown.empty();
        dropdown.append(new Option(hasAllOption ? defaultOptionText.replace('Select', 'All') : defaultOptionText, ''));
        dataArray.forEach(item => dropdown.append(new Option(item[textKey], item[valueKey])));
        dropdown.val(currentVal).trigger('change.select2');
    }

    function initializeUIComponents() {
        $('.select2-enabled').select2({ placeholder: "Select", allowClear: true, width: '100%' });
        $('.select2-enabled-filter').select2({ placeholder: "All", allowClear: true, width: '100%' });
        $(".datepicker").datepicker({ dateFormat: 'dd/mm/yy' });
        $('#taskDate').datepicker({
            dateFormat: 'dd/mm/yy',
            minDate: 0,
            maxDate: 1
        });
        $(".datepicker-filter").datepicker({ dateFormat: 'dd/mm/yy' });
    }

    function updateAllDashboardDropdowns() {
        populateDropdown($('#taskOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown(elements.employeeOrganizationSelect, organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#processOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#campaignOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown(elements.filterOrganization, organizations, '_id', 'name', 'All Organizations', true);
        populateDropdown($('#editOrganization'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#editProcessOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#editCampaignOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');

        populateDropdown(elements.filterProcess, processes, '_id', 'name', 'All Processes', true);
        populateDropdown($('#editProcess'), processes, '_id', 'name', 'Select Process');
        populateDropdown($('#editCampaignProcessSelect'), processes, '_id', 'name', 'Select Process');

        const activeEmployees = employees.filter(emp => emp.isActive);
        populateDropdown($('#taskEmployeeSelect'), activeEmployees, 'id', 'name', 'Select Employee');
        populateDropdown(elements.filterEmployee, activeEmployees, 'id', 'name', 'All Employees', true);
        populateDropdown($('#editEmployee'), activeEmployees, 'id', 'name', 'Select Employee');
        populateDropdown($('#editAllocatedTaskEmployeeSelect'), activeEmployees, 'id', 'name', 'Select Employee');
        
        const allEmployees = employees.filter(emp => emp.id !== 'admin_account');
        populateDropdown(elements.loginEmployeeId, allEmployees, 'id', 'name', 'Select Employee');

        populateDropdown($('#leadsQuantityCampaignMaster'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#prospectsQuantityCampaignMaster'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#editLeadsCampaign'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#editProspectsCampaign'), campaigns, '_id', 'name', 'Select Campaign');

        populateDropdown(elements.filterCampaign, campaigns, '_id', 'name', 'All Campaigns', true);

        const statusOptions = [
            {value: 'Pending', text: 'Pending'},
            {value: 'Under process', text: 'Under process'},
            {value: 'Completed', text: 'Completed'},
            {value: 'On hold', text: 'On hold'},
            {value: 'Overdue', text: 'Overdue'}
        ];
        populateDropdown(elements.filterStatus, statusOptions, 'value', 'text', 'All Statuses', true);
    }

    function initializeTaskAssignmentBuilders() {
        const currentYear = new Date().getFullYear();
        const yearSelects = $('#leadsAssignmentYear, #prospectsAssignmentYear, #editLeadsAssignmentYear, #editProspectsAssignmentYear');
        yearSelects.empty();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            yearSelects.append(new Option(i, i));
        }

        const monthSelects = $('#leadsAssignmentMonth, #prospectsAssignmentMonth, #editLeadsAssignmentMonth, #editProspectsAssignmentMonth');
        monthSelects.each(function() {
            const $this = $(this);
            $this.empty();
            $this.append('<option value="" selected disabled hidden>Select Month</option>');
            $this.append('<option value="All">All</option>');
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            months.forEach(m => $this.append(new Option(m, m)));
            $this.val('');
        });

        $('#leadsAssignmentYear').val(currentYear);
        $('#prospectsAssignmentYear').val(currentYear);
        $('#leadsAssignmentRegion').val('');
        $('#leadsQuantityCampaignMaster').val(null).trigger('change.select2');

        $('#prospectsAssignmentMonth').val('');
        $('#prospectsAssignmentYear').val(currentYear);
        $('#prospectsAssignmentRegion').val('');
        $('#prospectsQuantityCampaignMaster').val(null).trigger('change.select2');

        $('#leftBoxLeads, #rightBoxLeads, #leftBoxProspects, #rightBoxProspects').empty();
    }

    function moveOptions(fromBoxId, toBoxId) {
        const fromBox = document.getElementById(fromBoxId);
        const toBox = document.getElementById(toBoxId);
        if (!fromBox || !toBox) {
            console.error(`Missing one of the listboxes: #${fromBoxId} or #${toBoxId}`);
            return;
        }
        Array.from(fromBox.selectedOptions).forEach(option => {
            toBox.appendChild(option);
        });
        Array.from(fromBox.options).forEach(option => option.selected = false);
    }

    function addAssignment(type, listboxPrefix) {
        let displayText = '';
        let valueText = '';
        let isValid = false;

        const monthMap = { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' };

        if (type === 'dateRange') {
            const dateFrom = $(`#${listboxPrefix}DateFrom`).val();
            const dateTo = $(`#${listboxPrefix}DateTo`).val();
            if (dateFrom && dateTo) {
                displayText = `Date: ${dateFrom} - ${dateTo}`;
                valueText = `date-${formatDateToISO(dateFrom)}-${formatDateToISO(dateTo)}`;
                isValid = true;
            } else {
                alert('Please select both Date From and Date To.');
            }
        } else if (type === 'monthYear') {
            const monthValue = $(`#${listboxPrefix}AssignmentMonth`).val();
            const yearValue = $(`#${listboxPrefix}AssignmentYear`).val();
            if (monthValue && yearValue) {
                const monthText = monthValue === 'All' ? 'All Months' : monthValue;
                displayText = `Month: ${monthText}-${yearValue}`;
                valueText = `month-${monthValue}-${yearValue}`;
                isValid = true;
            } else {
                alert('Please select both Month and Year.');
            }
        } else if (type === 'region') {
            const regionValue = $(`#${listboxPrefix}AssignmentRegion`).val();
            if (regionValue) {
                const regionText = regionValue === 'All' ? 'All Regions' : regionValue;
                displayText = `Region: ${regionText}`;
                valueText = `region-${regionValue}`;
                isValid = true;
            } else {
                alert('Please select a Region.');
            }
        } else if (type === 'campaign') {
            let campaignValue = $(`#${listboxPrefix}QuantityCampaignMaster`).val();
            if (!campaignValue) {
                campaignValue = $(`#${listboxPrefix}Campaign`).val();
            }

            if (campaignValue) {
                const campaignText = campaigns.find(c => c._id === campaignValue)?.name || campaignValue;
                displayText = `Campaign: ${campaignText}`;
                valueText = `campaign-${campaignValue}`;
                isValid = true;
            } else {
                alert('Please select a Campaign.');
            }
        }

        if (!isValid) {
            return;
        }

        const leftBoxId = `leftBox${listboxPrefix.charAt(0).toUpperCase() + listboxPrefix.slice(1)}`;
        const rightBoxId = `rightBox${listboxPrefix.charAt(0).toUpperCase() + listboxPrefix.slice(1)}`;
        const leftBox = document.getElementById(leftBoxId);
        const rightBox = document.getElementById(rightBoxId);

        if (!leftBox || !rightBox) {
            console.error(`Could not find listboxes for prefix: ${listboxPrefix} (IDs: ${leftBoxId}, ${rightBoxId})`);
            alert('Failed to add assignment. Listbox elements not found.');
            return;
        }

        const optionExists = Array.from(leftBox.options).some(opt => opt.value === valueText) ||
                            Array.from(rightBox.options).some(opt => opt.value === valueText);

        if (optionExists) {
            alert('This assignment already exists.');
            return;
        }

        leftBox.appendChild(new Option(displayText, valueText));

        if (type === 'dateRange') {
            $(`#${listboxPrefix}DateFrom`).val('');
            $(`#${listboxPrefix}DateTo`).val('');
        } else if (type === 'monthYear') {
            $(`#${listboxPrefix}AssignmentMonth`).val('');
            $(`#${listboxPrefix}AssignmentYear`).val(currentYear);
        } else if (type === 'region') {
            $(`#${listboxPrefix}AssignmentRegion`).val('All');
        } else if (type === 'campaign') {
            $(`#${listboxPrefix}QuantityCampaignMaster`).val(null).trigger('change.select2');
            $(`#${listboxPrefix}Campaign`).val(null).trigger('change.select2');
        }
    }

    function getSelectionsFromListbox(boxId) {
        const box = document.getElementById(boxId);
        if (!box) {
            console.error(`Listbox with ID #${boxId} not found!`);
            return [];
        }
        return Array.from(box.options).map(opt => opt.value);
    }

    async function toggleTaskActivation(taskId, newStatus) {
        const taskIndex = allTasksData.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            alert('Task not found.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE task ${taskId}?`
            : `Are you sure you want to DEACTIVATE task ${taskId}? Deactivated tasks will not appear on employee dashboards.`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            const updatedTask = { ...allTasksData[taskIndex], isActive: newStatus };
            await makeAuthRequest('/admin/tasks', 'PUT', updatedTask);

            allTasksData[taskIndex].isActive = newStatus;

            alert(`Task ${taskId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
            $('#taskEditModal').modal('hide');
            applyFiltersAndRenderTasks();
        } catch (error) {
            console.error(`Failed to toggle task activation for ${taskId}:`, error);
            alert(`Error toggling task status: ${error.message}`);
        }
    }

    function toggleEmployeeActivation(empId, newStatus) {
        const employeeIndex = employees.findIndex(e => e.id === empId);
        if (employeeIndex === -1) {
            alert('Employee not found.');
            return;
        }

        if (empId === 'admin_account') {
            alert('Cannot deactivate the main admin account.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE employee ${empId}?`
            : `Are you sure you want to DEACTIVATE employee ${empId}? Deactivated employees will lose access and not appear on dashboards.`;

        if (!confirm(confirmMessage)) {
            return;
        }

        employees[employeeIndex].isActive = newStatus;
        if (!newStatus) {
            employees[employeeIndex].username = null;
            employees[employeeIndex].password = null;
            employees[employeeIndex].role = null;
        }

        alert(`Employee ${empId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
        
        const activeTab = $('#masterTabs .nav-link.active').attr('id');
        if (activeTab === 'employee-tab') {
            renderEmployeeMasterTable();
        } else {
            renderEmployeeDetailsTable();
        }
        updateAllDashboardDropdowns();
    }

    async function toggleMasterActivation(id, type, newStatus) {
        let dataArray, itemIndex, itemName;

        switch (type) {
            case 'organization':
                dataArray = organizations;
                itemIndex = organizations.findIndex(org => org._id === id);
                itemName = organizations[itemIndex]?.name;
                // Cascade deactivation/activation to dependent processes, campaigns, and employees
                processes.filter(p => p.organizationId === id).forEach(p => p.isActive = newStatus);
                campaigns.filter(c => c.organizationId === id).forEach(c => c.isActive = newStatus);
                employees.filter(emp => emp.organizations.includes(id)).forEach(emp => emp.isActive = newStatus);
                allTasksData.filter(task => task.organization === id).forEach(task => task.isActive = newStatus);
                break;
            case 'process':
                dataArray = processes;
                itemIndex = processes.findIndex(proc => proc._id === id);
                itemName = processes[itemIndex]?.name;
                // Cascade deactivation/activation to dependent campaigns and tasks
                campaigns.filter(c => c.processId === id).forEach(c => c.isActive = newStatus);
                allTasksData.filter(task => task.process === id).forEach(task => task.isActive = newStatus);
                break;
            case 'campaign':
                dataArray = campaigns;
                itemIndex = campaigns.findIndex(camp => camp._id === id);
                itemName = campaigns[itemIndex]?.name;
                // Cascade deactivation/activation to dependent tasks
                allTasksData.filter(task => (task.leads && task.leads.campaign === id) || (task.prospects && task.prospects.campaign === id)).forEach(task => task.isActive = newStatus);
                break;
            default:
                console.error('Unknown master type:', type);
                return;
        }

        if (itemIndex === -1) {
            alert(`${type} not found.`);
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE ${type} "${itemName}" (ID: ${id})?`
            : `Are you sure you want to DEACTIVATE ${type} "${itemName}" (ID: ${id})? This will also affect related records (processes, campaigns, tasks, employees).`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            dataArray[itemIndex].isActive = newStatus;
            await makeAuthRequest(`/admin/${type}s`, 'PUT', dataArray[itemIndex]);

            alert(`${type} "${itemName}" has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);

            if (type === 'organization') {
                loadOrganizations();
                loadProcesses();
                loadCampaigns();
                loadEmployees();
                applyFiltersAndRenderTasks();
            } else if (type === 'process') {
                loadProcesses();
                loadCampaigns();
                applyFiltersAndRenderTasks();
            } else if (type === 'campaign') {
                loadCampaigns();
                applyFiltersAndRenderTasks();
            }
            updateAllDashboardDropdowns();

        } catch (error) {
            console.error(`Failed to toggle ${type} activation for ${id}:`, error);
            alert(`Error toggling ${type} status: ${error.message}`);
        }
    }

    // Renders the Employee Details table with Profile and Activate/Deactivate buttons
    function renderEmployeeDetailsTable() {
        console.log("renderEmployeeDetailsTable() called.");
        const $tableBody = elements.employeesTableBody;
        $tableBody.empty();

        if (employees.length === 0) {
            $tableBody.append('<tr><td colspan="6" class="text-center">No employees available.</td></tr>');
            return;
        }

        employees.filter(emp => emp.id !== 'admin_account').forEach(emp => {
            const orgNames = (emp.organizations || [])
                .map(orgId => organizations.find(o => o._id === orgId)?.name)
                .filter(Boolean)
                .join(', ') || '--';

            const processNames = (emp.processes || [])
                .map(procId => processes.find(p => p._id === procId)?.name)
                .filter(Boolean)
                .join(', ') || '--';

            const statusText = emp.isActive ? 'Active' : 'Inactive';
            const statusClass = emp.isActive ? 'text-success' : 'text-danger';

            const toggleBtnClass = emp.isActive ? 'btn-danger' : 'btn-success';
            const toggleBtnIcon = emp.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const toggleBtnHtml = `<button class="btn btn-sm ${toggleBtnClass} toggle-employee-status-btn" data-id="${emp.id}" data-status="${!emp.isActive}" title="${emp.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${toggleBtnIcon}"></i></button>`;


            const rowHtml = `
                <tr data-id="${emp.id}">
                    <td>${emp.id}</td>
                    <td>${emp.name}</td>
                    <td>${orgNames}</td>
                    <td>${processNames}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-info view-profile-btn me-2" data-id="${emp.id}"><i class="fas fa-user-circle"></i></button>
                        ${toggleBtnHtml}
                    </td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });

        // Event handler for the new profile icon
        $tableBody.off('click', '.view-profile-btn').on('click', '.view-profile-btn', function() {
            const empId = $(this).data('id');
            const employee = employees.find(e => e.id === empId);
            if (employee) {
                populateProfileModal(employee);
                $('#employeeProfileModal').modal('show');
            }
        });

        // Event handler for the toggle status button
        $tableBody.off('click', '.toggle-employee-status-btn').on('click', '.toggle-employee-status-btn', function() {
            const empId = $(this).data('id');
            const newStatus = $(this).data('status');
            toggleEmployeeActivation(empId, newStatus);
        });
    }

    // New function to render the Employee Master table
    function renderEmployeeMasterTable() {
        console.log("renderEmployeeMasterTable() called.");
        const $tableBody = $('#employeeMasterTableBody');
        $tableBody.empty();

        const employeesToDisplay = employees.filter(emp => emp.id !== 'admin_account');
        if (employeesToDisplay.length === 0) {
            $tableBody.append('<tr><td colspan="8" class="text-center">No employees available.</td></tr>');
            return;
        }

        employeesToDisplay.forEach(emp => {
            const orgNames = (emp.organizations || [])
                .map(orgId => organizations.find(o => o._id === orgId)?.name)
                .filter(Boolean)
                .join(', ') || '--';

            const processNames = (emp.processes || [])
                .map(procId => processes.find(p => p._id === procId)?.name)
                .filter(Boolean)
                .join(', ') || '--';

            const statusText = emp.isActive ? 'Active' : 'Inactive';
            const statusClass = emp.isActive ? 'text-success' : 'text-danger';
            
            const toggleBtnClass = emp.isActive ? 'btn-danger' : 'btn-success';
            const toggleBtnIcon = emp.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const toggleBtnHtml = `<button class="btn btn-sm ${toggleBtnClass} toggle-employee-status-btn" data-id="${emp.id}" data-status="${!emp.isActive}" title="${emp.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${toggleBtnIcon}"></i></button>`;

            const profileBtnHtml = `<button class="btn btn-sm btn-info view-profile-btn me-2" data-id="${emp.id}"><i class="fas fa-user-circle"></i></button>`;

            const rowHtml = `
                <tr data-id="${emp.id}">
                    <td>${emp.id}</td>
                    <td>${emp.name}</td>
                    <td>${emp.designation || '--'}</td>
                    <td>${emp.department || '--'}</td>
                    <td>${orgNames}</td>
                    <td>${processNames}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td class="text-center">
                        ${profileBtnHtml}
                        ${toggleBtnHtml}
                    </td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });
        
        $tableBody.off('click', '.view-profile-btn').on('click', '.view-profile-btn', function() {
            const empId = $(this).data('id');
            const employee = employees.find(e => e.id === empId);
            if (employee) {
                populateProfileModal(employee);
                $('#employeeProfileModal').modal('show');
            }
        });
        
        $tableBody.off('click', '.toggle-employee-status-btn').on('click', '.toggle-employee-status-btn', function() {
            const empId = $(this).data('id');
            const newStatus = $(this).data('status');
            toggleEmployeeActivation(empId, newStatus);
        });
    }

    // Populates the redesigned profile modal
    function populateProfileModal(employee) {
        editingProfile = employee;
        $('#profileEmployeeId').text(employee.id);
        $('#currentProfileEmployeeId').val(employee.id);

        $('#profileEmployeeName').val(employee.name);
        $('#profileEmployeeDesignation').val(employee.designation);
        $('#profileEmployeeDepartment').val(employee.department);
        $('#profileEmployeeLocation').val(employee.location);
        $('#profileEmployeeLangKnown').val(employee.langKnown);
        $('#profileEmployeeType').val(employee.employeeType);
        
        // Populate Organizations and Processes as a string for display
        const orgNames = (employee.organizations || [])
            .map(orgId => organizations.find(o => o._id === orgId)?.name)
            .filter(Boolean)
            .join(', ') || '--';
        $('#profileEmployeeOrganizations').val(orgNames);

        const processNames = (employee.processes || [])
            .map(procId => processes.find(p => p._id === procId)?.name)
            .filter(Boolean)
            .join(', ') || '--';
        $('#profileEmployeeProcesses').val(processNames);
        
        $('#profileLoginUsername').val(employee.username || '--');
        $('#profileLoginRole').val(employee.role || '--');
        $('#profileEmployeeStatus').val(employee.isActive ? 'true' : 'false');
    
        toggleProfileEditMode(false);
    }

    // Handles the edit button in the profile modal
    function toggleProfileEditMode(isEditMode) {
        const $formInputs = $('#editEmployeeProfileForm').find('input, select');
        const $editBtn = $('#enableProfileEditBtn');
        const $updateBtn = $('#updateProfileBtn');

        if (isEditMode) {
            $formInputs.prop('disabled', false);
            $('#profileEmployeeOrganizations').prop('disabled', true); // Organization input remains disabled
            $('#profileEmployeeProcesses').prop('disabled', true); // Process input remains disabled
            $updateBtn.removeClass('d-none');
            $editBtn.text('Cancel');
        } else {
            $formInputs.prop('disabled', true);
            $updateBtn.addClass('d-none');
            $editBtn.text('Edit');
        }
    }

    // Handles the update action in the profile modal
    async function updateEmployeeProfile() {
        if (!editingProfile) return;

        const updatedData = {
            id: editingProfile.id,
            name: $('#profileEmployeeName').val().trim(),
            designation: $('#profileEmployeeDesignation').val().trim(),
            department: $('#profileEmployeeDepartment').val().trim(),
            location: $('#profileEmployeeLocation').val().trim(),
            langKnown: $('#profileEmployeeLangKnown').val().trim(),
            employeeType: $('#profileEmployeeType').val(),
            username: $('#profileLoginUsername').val().trim(),
            role: $('#profileLoginRole').val().trim(),
            isActive: $('#profileEmployeeStatus').val() === 'true'
        };

        if (!updatedData.name || !updatedData.designation || !updatedData.department || !updatedData.location || !updatedData.langKnown || !updatedData.employeeType) {
            alert('Please fill in all required employee details fields.');
            return;
        }

        try {
            await makeAuthRequest('/admin/employees_full', 'PUT', updatedData);
            alert(`Employee ${updatedData.name}'s profile updated successfully (simulated)!`);

            // Update local mock data
            const empIndex = employees.findIndex(e => e.id === updatedData.id);
            if (empIndex !== -1) {
                employees[empIndex] = { ...employees[empIndex], ...updatedData };
            }

            $('#employeeProfileModal').modal('hide');
            renderEmployeeDetailsTable();
            loadEmployeesMaster();
            updateAllDashboardDropdowns();
        } catch (error) {
            console.error('Failed to update employee profile:', error);
            alert('Error updating employee profile: ' + error.message);
        }
    }

    async function loadEmployees() {
        console.log("loadEmployees() called (for Manage User section).");
        renderEmployeeDetailsTable();
        updateAllDashboardDropdowns();
    }

    async function loadEmployeesMaster() {
        console.log("loadEmployeesMaster() called (for Employee Master tab).");
        renderEmployeeMasterTable();
        updateAllDashboardDropdowns();
    }

    async function loadOrganizations() {
        console.log("loadOrganizations() called.");
        try {
            const orgsTableBody = elements.organizationsTableBody[0];
            if (!orgsTableBody) { console.error("Error: #organizationsTableBody not found."); return; }
            orgsTableBody.innerHTML = '';
            organizations.forEach(org => {
                const activationButtonClass = org.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = org.isActive ? 'fa-times-circle' : 'fa-check-circle';

                const row = `<tr><td>${org._id}</td><td>${org.name}</td>
                                <td>
                                    <button class="btn btn-sm btn-info edit-organization-btn me-2" data-id="${org._id}" data-name="${org.name}"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${org._id}" data-type="organization" data-status="${!org.isActive}" title="${org.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                                </td></tr>`;
                orgsTableBody.insertAdjacentHTML('beforeend', row);
            });
            elements.organizationsTableBody.off('click').on('click', '.toggle-master-status-btn', async (e) => {
                const id = $(e.currentTarget).data('id');
                const type = $(e.currentTarget).data('type');
                const newStatus = $(e.currentTarget).data('status');
                toggleMasterActivation(id, type, newStatus);
            }).on('click', '.edit-organization-btn', function() {
                const orgId = $(this).data('id');
                const orgName = $(this).data('name');

                $('#currentEditOrganizationId').val(orgId);
                $('#editOrganizationModalId').text(orgId);
                $('#editOrganizationNameInput').val(orgName);
                $('#organizationEditModal').modal('show');
            });
        } catch (error) {
            console.error('Failed to load organizations:', error);
        }
    }

    async function loadProcesses() {
        console.log("loadProcesses() called.");
        try {
            const processesTableBody = elements.processesTableBody[0];
            if (!processesTableBody) { console.error("Error: #processesTableBody not found."); return; }
            processesTableBody.innerHTML = '';
            processes.forEach(proc => {
                const orgName = organizations.find(o => o._id === proc.organizationId)?.name || '--';
                const activationButtonClass = proc.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = proc.isActive ? 'fa-times-circle' : 'fa-check-circle';

                const row = `<tr>
                    <td>${proc._id}</td>
                    <td>${proc.name}</td>
                    <td>${orgName}</td>
                    <td>
                        <button class="btn btn-sm btn-info edit-process-btn me-2" data-id="${proc._id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${proc._id}" data-type="process" data-status="${!proc.isActive}" title="${proc.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                    </td>
                    </tr>`;
                processesTableBody.insertAdjacentHTML('beforeend', row);
            });
            elements.processesTableBody.off('click').on('click', '.toggle-master-status-btn', async (e) => {
                const id = $(e.currentTarget).data('id');
                const type = $(e.currentTarget).data('type');
                const newStatus = $(e.currentTarget).data('status');
                toggleMasterActivation(id, type, newStatus);
            }).on('click', '.edit-process-btn', function() {
                const procId = $(this).data('id');
                const processToEdit = processes.find(p => p._id === procId);

                if (processToEdit) {
                    $('#currentEditProcessId').val(processToEdit._id);
                    $('#editProcessModalId').text(processToEdit._id);
                    $('#editProcessNameInput').val(processToEdit.name);

                    const $editOrgSelect = $('#editProcessOrganizationSelect');
                    $editOrgSelect.empty();
                    organizations.forEach(org => {
                        $editOrgSelect.append(`<option value="${org._id}">${org.name}</option>`);
                    });
                    $editOrgSelect.val(processToEdit.organizationId).trigger('change.select2');

                    $('#processEditModal').modal('show');
                } else {
                    alert('Process not found for editing.');
                }
            });
        } catch (error) {
            console.error('Failed to load processes:', error);
        }
    }

    async function loadCampaigns() {
        console.log("loadCampaigns() called.");
        try {
            const campaignsTableBody = elements.campaignsTableBody[0];
            if (!campaignsTableBody) { return; }
            campaignsTableBody.innerHTML = '';

            campaigns.forEach(camp => {
                const orgName = organizations.find(o => o._id === camp.organizationId)?.name || '--';
                const procName = processes.find(p => p._id === camp.processId)?.name || '--';
                const activationButtonClass = camp.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = camp.isActive ? 'fa-times-circle' : 'fa-check-circle';

                const row = `<tr>
                                <td>${camp._id}</td>
                                <td>${camp.name}</td>
                                <td>${orgName}</td>
                                <td>${procName}</td>
                                <td>
                                    <button class="btn btn-sm btn-info edit-campaign-btn me-2" data-id="${camp._id}"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${camp._id}" data-type="campaign" data-status="${!camp.isActive}" title="${camp.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                                </td>
                            </tr>`;
                campaignsTableBody.insertAdjacentHTML('beforeend', row);
            });

            elements.campaignsTableBody.off('click').on('click', '.toggle-master-status-btn', async (e) => {
                const id = $(e.currentTarget).data('id');
                const type = $(e.currentTarget).data('type');
                const newStatus = $(e.currentTarget).data('status');
                toggleMasterActivation(id, type, newStatus);
            }).on('click', '.edit-campaign-btn', function() {
                const campId = $(this).data('id');
                const campaignToEdit = campaigns.find(c => c._id === campId);

                if (campaignToEdit) {
                    $('#currentEditCampaignId').val(campaignToEdit._id);
                    $('#editCampaignModalId').text(campaignToEdit._id);
                    $('#editCampaignNameInput').val(campaignToEdit.name);

                    const $editOrgSelect = $('#editCampaignOrganizationSelect');
                    $editOrgSelect.empty();
                    organizations.forEach(org => {
                        $editOrgSelect.append(`<option value="${org._id}">${org.name}</option>`);
                    });
                    $editOrgSelect.val(campaignToEdit.organizationId).trigger('change.select2');

                    $editOrgSelect.off('change.editCampaignModalCascade').on('change.editCampaignModalCascade', function() {
                        const selectedOrgId = $(this).val();
                        const $editProcSelect = $('#editCampaignProcessSelect');
                        $editProcSelect.empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');

                        if (selectedOrgId) {
                            const filteredProcesses = processes.filter(p => p.organizationId === selectedOrgId);
                            if (filteredProcesses.length > 0) {
                                filteredProcesses.forEach(proc => $editProcSelect.append(new Option(proc.name, proc._id)));
                            } else {
                                $editProcSelect.append('<option value="">No Processes Found</option>');
                            }
                        }
                    });
                    $editOrgSelect.trigger('change.editCampaignModalCascade');

                    setTimeout(() => {
                        $('#editCampaignProcessSelect').val(campaignToEdit.processId).trigger('change.select2');
                    }, 50);

                    $('#campaignEditModal').modal('show');
                } else {
                    alert('Campaign not found for editing.');
                }
            });
        } catch (error) {
            console.error('Failed to load campaigns:', error);
        }
    }

    function applyFiltersAndRenderTasks() {
        console.log("applyFiltersAndRenderTasks() called with filters:", currentFilters);
        let filteredTasks = [...allTasksData];

        const currentSectionId = $('.content-section:not(.d-none)').attr('id');

        if (currentSectionId === 'view-update-tasks-section') {
            filteredTasks = filteredTasks.filter(task => task.isActive);
        }

        if (currentFilters.searchTerm) {
            const searchTermLower = currentFilters.searchTerm.toLowerCase();
            filteredTasks = filteredTasks.filter(task => {
                const employeeName = employees.find(emp => emp.id === task.assignedToEmployee)?.name || '';
                const organizationName = organizations.find(org => org._id === task.organization)?.name || '';
                const processName = processes.find(proc => proc._id === task.process)?.name || '';

                return task.id.toLowerCase().includes(searchTermLower) ||
                    employeeName.toLowerCase().includes(searchTermLower) ||
                    organizationName.toLowerCase().includes(searchTermLower) ||
                    processName.toLowerCase().includes(searchTermLower) ||
                    (task.generalComment && task.generalComment.toLowerCase().includes(searchTermLower)) ||
                    (task.leads && task.leads.comment && task.leads.comment.toLowerCase().includes(searchTermLower)) ||
                    (task.prospects && task.prospects.comment && task.prospects.comment.toLowerCase().includes(searchTermLower));
            });
        }

        if (currentFilters.taskDateFrom && currentFilters.taskDateTo) {
            const from = parseDate(currentFilters.taskDateFrom);
            const to = parseDate(currentFilters.taskDateTo);
            if (from && to) {
                to.setHours(23, 59, 59, 999);
                filteredTasks = filteredTasks.filter(task => {
                    const taskDate = new Date(task.taskDate);
                    return taskDate >= from && taskDate <= to;
                });
            }
        }

        if (currentFilters.organization) { filteredTasks = filteredTasks.filter(task => task.organization === currentFilters.organization); }
        if (currentFilters.process) { filteredTasks = filteredTasks.filter(task => task.process === currentFilters.process); }
        if (currentFilters.employee) { filteredTasks = filteredTasks.filter(task => task.assignedToEmployee === currentFilters.employee); }
        if (currentFilters.campaign) { filteredTasks = filteredTasks.filter(task => (task.leads && task.leads.campaign === currentFilters.campaign) || (task.prospects && task.prospects.campaign === currentFilters.campaign)); }
        if (currentFilters.status) { filteredTasks = filteredTasks.filter(task => task.status === currentFilters.status); }

        const currentSection = document.querySelector('.content-section:not(.d-none)');
        if (currentSection && currentSection.id === 'all-tasks-section') {
            renderTasksTable(document.getElementById('allTasksTableBody'), filteredTasks, 'all-tasks');
        } else if (currentSection && currentSection.id === 'view-update-tasks-section') {
            renderTasksTable(document.getElementById('filteredTasksTableBody'), filteredTasks, 'view-update-tasks');
        } else {
            console.warn("Tasks sections not active. Not rendering tasks.");
        }
        renderActiveFilters();
    }

    function renderTasksTable(tableBodyElement, tasksToRender, sectionType) {
        if (!tableBodyElement) {
            console.error(`Error: Table body element for type '${sectionType}' not found.`);
            return;
        }

        tableBodyElement.innerHTML = '';

        let colspan;
        if (sectionType === 'all-tasks') {
            colspan = 19;
        } else if (sectionType === 'view-update-tasks') {
            colspan = 13;
        } else {
            colspan = 9;
        }

        if (tasksToRender.length === 0) {
            tableBodyElement.innerHTML = `<tr><td colspan="${colspan}" class="text-center">No tasks matching current filters.</td></tr>`;
            return;
        }

        tasksToRender.forEach(task => {
            const getOrgName = (orgId) => organizations.find(o => o._id === orgId)?.name || '--';
            const getProcessName = (procId) => processes.find(p => p._id === procId)?.name || '--';
            const getEmployeeName = (empId) => employees.find(e => e.id === empId)?.name || '--';
            const getCampaignName = (campId) => campaigns.find(c => c._id === campId)?.name || '--';

            const taskDateFormatted = task.taskDate ? new Date(task.taskDate).toLocaleDateString('en-GB') : '--';
            const orgName = getOrgName(task.organization);
            const processName = getProcessName(task.process);
            const employeeName = getEmployeeName(task.assignedToEmployee);

            const leadsInfo = task.leads || {};
            const prospectsInfo = task.prospects || {};

            const leadsDateFromTo = (leadsInfo.dateFrom && leadsInfo.dateTo) ? `${new Date(leadsInfo.dateFrom).toLocaleDateString('en-GB')}-${new Date(leadsInfo.dateTo).toLocaleDateString('en-GB')}` : '--';
            const prospectsDateFromTo = (prospectsInfo.dateFrom && prospectsInfo.dateTo) ? `${new Date(prospectsInfo.dateFrom).toLocaleDateString('en-GB')}-${new Date(prospectsInfo.dateTo).toLocaleDateString('en-GB')}` : '--';

            const leadsMonthYear = leadsInfo.month || '--';
            const prospectsMonthYear = prospectsInfo.month || '--';

            const leadsRegion = leadsInfo.region || '--';
            const prospectsRegion = prospectsInfo.region || '--';

            const salesLacs = prospectsInfo.employeeSaleTarget ? (prospectsInfo.employeeSaleTarget / 100000).toFixed(2) : '0.00';

            const combinedRemarks = [task.generalComment, leadsInfo.comment, prospectsInfo.comment].filter(Boolean).join('; ');

            let rowHtml = '';
            if (sectionType === 'all-tasks') {
                const activationButtonClass = task.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = task.isActive ? 'fas fa-times-circle' : 'fas fa-check-circle';
                rowHtml = `
                    <tr>
                        <td>${taskDateFormatted}</td>
                        <td>${orgName}</td>
                        <td>${processName}</td>
                        <td>${employeeName}</td>
                        <td>${leadsDateFromTo}</td>
                        <td>${leadsMonthYear}</td>
                        <td>${leadsRegion}</td>
                        <td>${getCampaignName(leadsInfo.campaign)}</td>
                        <td>${leadsInfo.quantity || '0'}</td>
                        <td>${leadsInfo.convertToProspects || '0'}</td>
                        <td>${prospectsDateFromTo}</td>
                        <td>${prospectsMonthYear}</td>
                        <td>${prospectsRegion}</td>
                        <td>${getCampaignName(prospectsInfo.campaign)}</td>
                        <td>${prospectsInfo.quantity || '0'}</td>
                        <td>${prospectsInfo.convertToWon || '0'}</td>
                        <td>${salesLacs}</td>
                        <td>${combinedRemarks}</td>
                        <td>
                            <button class="btn btn-sm btn-primary edit-task-btn me-2" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm ${activationButtonClass} toggle-task-status-btn" data-id="${task.id}" data-status="${!task.isActive}" title="${task.isActive ? 'Deactivate Task' : 'Activate Task'}">
                                <i class="${activationButtonIcon}"></i>
                            </button>
                        </td>
                    </tr>
                `;
            } else if (sectionType === 'view-update-tasks') {
                const activeSalesLacs = task.activeSales ? (task.activeSales / 100000).toFixed(2) : '0.00';
                rowHtml = `
                    <tr>
                        <td>${task.id}</td>
                        <td>${employeeName}</td>
                        <td>${leadsInfo.dateFrom && leadsInfo.dateTo ? leadsDateFromTo : '--'}</td>
                        <td>${leadsInfo.quantity || '0'}</td>
                        <td>${leadsInfo.convertToProspects || '0'}</td>
                        <td>${task.activeLeadsToProspects || '0'}</td>
                        <td>${prospectsInfo.dateFrom && prospectsInfo.dateTo ? prospectsDateFromTo : '--'}</td>
                        <td>${prospectsInfo.quantity || '0'}</td>
                        <td>${prospectsInfo.convertToWon || '0'}</td>
                        <td>${task.activeConvertToWon || '0'}</td>
                        <td>${salesLacs}</td>
                        <td>${activeSalesLacs}</td>
                        <td>${task.generalComment || '--'}</td>
                    </tr>
                `;
            }
            tableBodyElement.insertAdjacentHTML('beforeend', rowHtml);
        });

        const $tableBody = $(tableBodyElement);
        $tableBody.off('click change');

        if (sectionType === 'all-tasks') {
            $tableBody.on('click', '.edit-task-btn', function() {
                const taskId = $(this).data('id');
                const task = allTasksData.find(t => t.id === taskId);
                if (task) {
                    populateEditTaskModal(task);
                    $('#taskEditModal').modal('show');
                }
            });
            $tableBody.on('click', '.toggle-task-status-btn', function() {
                const taskId = $(this).data('id');
                const newStatus = $(this).data('status');
                toggleTaskActivation(taskId, newStatus);
            });
        }
    }

    function populateEditTaskModal(task) {
        console.log("Populating edit modal for task:", task.id);
        $('#editTaskModalId').text(task.id);
        $('#editTaskId').val(task.id);

        $('#editTaskDate').val(task.taskDate ? new Date(task.taskDate).toLocaleDateString('en-GB') : '');
        elements.editOrganization.val(task.organization || '').trigger('change.select2');

        elements.editOrganization.off('change.editTaskCascade').on('change.editTaskCascade', function() {
            const orgId = $(this).val();
            const $processSelect = elements.editProcess;
            const $employeeSelect = elements.editEmployee;
            const $editLeadsCampaignSelect = elements.editLeadsCampaign;
            const $editProspectsCampaignSelect = elements.editProspectsCampaign;

            $processSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').trigger('change.select2');
            $employeeSelect.prop('disabled', true).empty().append('<option value="">Select Employee</option>').trigger('change.select2');
            $editLeadsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Process First</option>').trigger('change.select2');
            $editProspectsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Process First</option>').trigger('change.select2');


            if (orgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === orgId);
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $processSelect.append(new Option(proc.name, proc._id)));
                    $processSelect.prop('disabled', false);
                } else {
                    $processSelect.empty().append('<option value="">No Processes Found</option>').val('').trigger('change.select2');
                }

                const filteredEmployees = employees.filter(e => e.organizations.includes(orgId) && e.isActive);
                if (filteredEmployees.length > 0) {
                    filteredEmployees.forEach(emp => $employeeSelect.append(new Option(`${emp.name} (${emp.id})`, emp.id)));
                    $employeeSelect.prop('disabled', false);
                } else {
                    $employeeSelect.empty().append('<option value="">No Employees Found</option>').val('').trigger('change.select2');
                }
            }
        });

        elements.editProcess.off('change.editTaskCampaignCascade').on('change.editTaskCampaignCascade', function() {
            const processId = $(this).val();
            const orgId = elements.editOrganization.val();
            const $editLeadsCampaignSelect = elements.editLeadsCampaign;
            const $editProspectsCampaignSelect = elements.editProspectsCampaign;

            $editLeadsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Campaign</option>').trigger('change.select2');
            $editProspectsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Campaign</option>').trigger('change.select2');


            if (processId && orgId) {
                const filteredCampaigns = campaigns.filter(c => c.organizationId === orgId && c.processId === processId);
                if (filteredCampaigns.length > 0) {
                    filteredCampaigns.forEach(camp => {
                        $editLeadsCampaignSelect.append(new Option(camp.name, camp._id));
                        $editProspectsCampaignSelect.append(new Option(camp.name, camp._id));
                    });
                    $editLeadsCampaignSelect.prop('disabled', false);
                    $editProspectsCampaignSelect.prop('disabled', false);
                } else {
                    $editLeadsCampaignSelect.empty().append('<option value="">No Campaigns Found</option>').val('').trigger('change.select2');
                    $editProspectsCampaignSelect.empty().append('<option value="">No Campaigns Found</option>').val('').trigger('change.select2');
                }
            }
        });

        elements.editOrganization.trigger('change.editTaskCascade');
        setTimeout(() => {
            elements.editProcess.val(task.process || '').trigger('change.select2');
            elements.editEmployee.val(task.assignedToEmployee || '').trigger('change.select2');
            elements.editProcess.trigger('change.editTaskCampaignCascade');
            setTimeout(() => {
                elements.editLeadsCampaign.val((task.leads && task.leads.campaign) || '').trigger('change.select2');
                elements.editProspectsCampaign.val((task.prospects && task.prospects.campaign) || '').trigger('change.select2');
            }, 50);
        }, 50);

        const leads = task.leads || {};
        $('#editLeadsDateFrom').val(leads.dateFrom || '');
        $('#editLeadsDateTo').val(leads.dateTo || '');
        $('#editLeadsQty').val(leads.quantity || '0');
        $('#editConvertToProspects').val(leads.convertToProspects || '0');
        $('#editLeadsComment').val(leads.comment || '');

        const currentYear = new Date().getFullYear();
        const leadsYearSelect = $('#editLeadsAssignmentYear');
        leadsYearSelect.empty();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            leadsYearSelect.append(new Option(i, i));
        }
        leadsYearSelect.val(leads.month && leads.year ? leads.year : currentYear);

        const leadsMonthSelect = $('#editLeadsAssignmentMonth');
        leadsMonthSelect.empty().append('<option value="" selected disabled hidden>Select Month</option>').append('<option value="All">All</option>');
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months.forEach(m => leadsMonthSelect.append(new Option(m, m)));
        if (leads.month) {
            leadsMonthSelect.val(leads.month);
        } else {
            leadsMonthSelect.val('');
        }
        $('#editLeadsAssignmentRegion').val(leads.region || '');

        $('#leftBoxEditLeads, #rightBoxEditLeads').empty();
        if (leads.assignments && leads.assignments.length > 0) {
            leads.assignments.forEach(assign => {
                const parts = assign.split('-');
                let displayText = '';
                if (parts[0] === 'date') {
                    const dateFromFormatted = new Date(parts[1]).toLocaleDateString('en-GB');
                    const dateToFormatted = new Date(parts[2]).toLocaleDateString('en-GB');
                    displayText = `Date: ${dateFromFormatted} - ${dateToFormatted}`;
                } else if (parts[0] === 'month') {
                    displayText = `Month: ${parts[1]}-${parts[2]}`;
                } else if (parts[0] === 'region') {
                    displayText = `Region: ${parts[1]}`;
                } else if (parts[0] === 'campaign') {
                    const campaignName = campaigns.find(c => c._id === parts[1])?.name || parts[1];
                    displayText = `Campaign: ${campaignName}`;
                }
                if (displayText) {
                    $('#rightBoxEditLeads').append(new Option(displayText, assign));
                }
            });
        }

        const prospects = task.prospects || {};
        $('#editProspectsDateFrom').val(prospects.dateFrom || '');
        $('#editProspectsDateTo').val(prospects.dateTo || '');
        $('#editProspectsQty').val(prospects.quantity || '0');
        $('#editConvertToWon').val(prospects.convertToWon || '0');
        $('#editEmployeeSaleTarget').val(prospects.employeeSaleTarget ? (prospects.employeeSaleTarget / 100000).toFixed(2) : '0.00');
        $('#editProspectsComment').val(prospects.comment || '');

        const prospectsYearSelect = $('#editProspectsAssignmentYear');
        prospectsYearSelect.empty();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            prospectsYearSelect.append(new Option(i, i));
        }
        prospectsYearSelect.val(prospects.month && prospects.year ? prospects.year : currentYear);

        const prospectsMonthSelect = $('#editProspectsAssignmentMonth');
        prospectsMonthSelect.empty().append('<option value="" selected disabled hidden>Select Month</option>').append('<option value="All">All</option>');
        months.forEach(m => prospectsMonthSelect.append(new Option(m, m)));
        if (prospects.month) {
            prospectsMonthSelect.val(prospects.month);
        } else {
            prospectsMonthSelect.val('');
        }
        $('#editProspectsAssignmentRegion').val(prospects.region || '');

        const prospectsCampaignSelect = $('#editProspectsCampaign');
        prospectsCampaignSelect.empty().append('<option value="">Select Campaign</option>');
        campaigns.forEach(camp => {
            prospectsCampaignSelect.append(new Option(camp.name, camp._id));
        });
        prospectsCampaignSelect.val(prospects.campaign || '').trigger('change.select2');

        $('#leftBoxEditProspects, #rightBoxEditProspects').empty();
        if (prospects.assignments && prospects.assignments.length > 0) {
            prospects.assignments.forEach(assign => {
                const parts = assign.split('-');
                let displayText = '';
                if (parts[0] === 'date') {
                    const dateFromFormatted = new Date(parts[1]).toLocaleDateString('en-GB');
                    const dateToFormatted = new Date(parts[2]).toLocaleDateString('en-GB');
                    displayText = `Date: ${dateFromFormatted} - ${dateToFormatted}`;
                } else if (parts[0] === 'month') {
                    displayText = `Month: ${parts[1]}-${parts[2]}`;
                } else if (parts[0] === 'region') {
                    displayText = `Region: ${parts[1]}`;
                } else if (parts[0] === 'campaign') {
                    const campaignName = campaigns.find(c => c._id === parts[1])?.name || parts[1];
                    displayText = `Campaign: ${campaignName}`;
                }
                if (displayText) {
                    $('#rightBoxEditProspects').append(new Option(displayText, assign));
                }
            });
        }

        initializeUIComponents();

        const $toggleBtn = $('#toggleTaskActivationBtn');
        if (task.isActive) {
            $toggleBtn.text('Deactivate Task').removeClass('btn-success').addClass('btn-warning');
            $toggleBtn.data('status', false);
        } else {
            $toggleBtn.text('Activate Task').removeClass('btn-warning').addClass('btn-success');
            $toggleBtn.data('status', true);
        }
        $toggleBtn.data('task-id', task.id);
    }

    function renderActiveFilters() {
        const currentSectionId = $('.content-section:not(.d-none)').attr('id');
        let activeFiltersDisplayElementId = 'activeFiltersDisplay';

        // Choose the correct search input and display area based on the active section
        let searchInput;
        if (currentSectionId === 'all-tasks-section') {
            searchInput = elements.universalTaskSearchInput;
        } else if (currentSectionId === 'view-update-tasks-section') {
            searchInput = elements.viewTaskSearchInput;
            activeFiltersDisplayElementId = 'activeFiltersDisplayView';
        }

        const activeFiltersDisplay = document.getElementById(activeFiltersDisplayElementId);
        if (!activeFiltersDisplay) return;
        activeFiltersDisplay.innerHTML = '';

        const filterLabels = {
            searchTerm: 'Search', taskDateFrom: 'Task Date From', taskDateTo: 'Task Date To',
            organization: 'Organization', process: 'Process', employee: 'Employee', campaign: 'Campaign', status: 'Status'
        };

        for (const key in currentFilters) {
            let value = currentFilters[key];
            if (value && value !== '' && value !== 'All') {
                let displayValue = value;
                if (key === 'organization') displayValue = organizations.find(o => o._id === value)?.name || value;
                else if (key === 'process') displayValue = processes.find(p => p._id === value)?.name || value;
                else if (key === 'employee') displayValue = employees.find(e => e.id === value)?.name || value;
                else if (key === 'campaign') displayValue = campaigns.find(c => c._id === value)?.name || value;
                else if (key.includes('Date')) displayValue = new Date(value.split('/').reverse().join('-')).toLocaleDateString('en-GB');

                const pill = `
                    <span class="filter-pill badge bg-primary me-2 mb-2">
                        ${filterLabels[key] || key}: <strong>${displayValue}</strong>
                        <span class="remove-filter ms-2" data-filter-key="${key}">×</span>
                    </span>
                `;
                activeFiltersDisplay.insertAdjacentHTML('beforeend', pill);
            }
        }

        $(activeFiltersDisplay).off('click', '.remove-filter').on('click', '.remove-filter', function() {
            const keyToRemove = $(this).data('filter-key');
            currentFilters[keyToRemove] = '';

            // Reset the correct input based on the active section
            if (keyToRemove === 'searchTerm') {
                searchInput.val('');
            } else if (keyToRemove === 'taskDateFrom' || keyToRemove === 'taskDateTo') {
                $(`#filterTaskDateFrom`).val('');
                $(`#filterTaskDateTo`).val('');
            } else {
                elements[`filter${keyToRemove.charAt(0).toUpperCase() + keyToRemove.slice(1)}`]?.val(null).trigger('change.select2');
            }
            applyFiltersAndRenderTasks();
        });
    }

    function setupCreateTaskCascades() {
        console.log("Setting up Daily Work Plan cascading dropdowns.");

        elements.taskProcessSelect.prop('disabled', true).empty().append('<option value="">Select Organization First</option>').trigger('change.select2');
        elements.taskEmployeeSelect.prop('disabled', true).empty().append('<option value="">Select Organization First</option>').trigger('change.select2');
        elements.leadsQuantityCampaignMaster.prop('disabled', true).empty().append('<option value="">Select Process First</option>').trigger('change.select2');
        elements.prospectsQuantityCampaignMaster.prop('disabled', true).empty().append('<option value="">Select Process First</option>').trigger('change.select2');

        elements.taskOrganizationSelect.off('change.taskFilter').on('change.taskFilter', function() {
            const orgId = $(this).val();
            const $processSelect = elements.taskProcessSelect;
            const $employeeSelect = elements.taskEmployeeSelect;
            const $leadsCampaignSelect = elements.leadsQuantityCampaignMaster;
            const $prospectsCampaignSelect = elements.prospectsQuantityCampaignMaster;

            $processSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');
            $employeeSelect.prop('disabled', true).empty().append('<option value="">Select Employee</option>').val('').trigger('change.select2');
            $leadsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Process First</option>').val('').trigger('change.select2');
            $prospectsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Process First</option>').val('').trigger('change.select2');


            if (orgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === orgId);
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $processSelect.append(new Option(proc.name, proc._id)));
                    $processSelect.prop('disabled', false);
                } else {
                    $processSelect.empty().append('<option value="">No Processes Found</option>').val('').trigger('change.select2');
                }

                const filteredEmployees = employees.filter(e => e.organizations.includes(orgId) && e.isActive);
                if (filteredEmployees.length > 0) {
                    filteredEmployees.forEach(emp => $employeeSelect.append(new Option(`${emp.name} (${emp.id})`, emp.id)));
                    $employeeSelect.prop('disabled', false);
                } else {
                    $employeeSelect.empty().append('<option value="">No Employees Found</option>').val('').trigger('change.select2');
                }
            }
        });

        elements.taskProcessSelect.off('change.campaignFilter').on('change.campaignFilter', function() {
            const processId = $(this).val();
            const orgId = elements.taskOrganizationSelect.val();
            const $leadsCampaignSelect = elements.leadsQuantityCampaignMaster;
            const $prospectsCampaignSelect = elements.prospectsQuantityCampaignMaster;

            $leadsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Campaign</option>').val('').trigger('change.select2');
            $prospectsCampaignSelect.prop('disabled', true).empty().append('<option value="">Select Campaign</option>').val('').trigger('change.select2');


            if (processId && orgId) {
                const filteredCampaigns = campaigns.filter(c => c.organizationId === orgId && c.processId === processId);
                if (filteredCampaigns.length > 0) {
                    filteredCampaigns.forEach(camp => {
                        $leadsCampaignSelect.append(new Option(camp.name, camp._id));
                        $prospectsCampaignSelect.append(new Option(camp.name, camp._id));
                    });
                    $leadsCampaignSelect.prop('disabled', false);
                    $prospectsCampaignSelect.prop('disabled', false);
                } else {
                    $leadsCampaignSelect.empty().append('<option value="">No Campaigns Found</option>').val('').trigger('change.select2');
                    $prospectsCampaignSelect.empty().append('<option value="">No Campaigns Found</option>').val('').trigger('change.select2');
                }
            }
        });
    }

    function setupMasterCascades() {
        console.log("Setting up Master cascading dropdowns for create forms.");

        $('#processOrganizationSelect').off('change.processMaster').on('change.processMaster', function() {
            const orgId = $(this).val();
            const $processNameInput = $('#processNameInput');
            if (orgId) {
                $processNameInput.prop('disabled', false).attr('placeholder', 'Enter Process Name');
            } else {
                $processNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Organization First');
            }
        }).trigger('change.processMaster');

        $('#campaignOrganizationSelect').off('change.campaignMasterOrg').on('change.campaignMasterOrg', function() {
            const orgId = $(this).val();
            const $processSelect = $('#campaignProcessSelect');
            const $campaignNameInput = $('#campaignNameInput');

            $processSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');
            $campaignNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Organization and Process First');

            if (orgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === orgId);
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $processSelect.append(new Option(proc.name, proc._id)));
                    $processSelect.prop('disabled', false);
                } else {
                    $processSelect.empty().append('<option value="">No Processes Found</option>').val('').trigger('change.select2');
                }
            }
        }).trigger('change.campaignMasterOrg');

        $('#campaignProcessSelect').off('change.campaignMasterProc').on('change.campaignMasterProc', function() {
            const processId = $(this).val();
            const $campaignNameInput = $('#campaignNameInput');
            if (processId) {
                $campaignNameInput.prop('disabled', false).attr('placeholder', 'Enter Campaign Name');
            } else {
                $campaignNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Process First');
            }
        }).trigger('change.campaignMasterProc');
    }
    
    // Employee Master Cascades
    function setupEmployeeMasterCascades() {
        const $orgSelect = $('#employeeOrganizationSelect');
        const $procSelect = $('#employeeProcessSelect');
        
        $orgSelect.off('change.employeeMasterOrg').on('change.employeeMasterOrg', function() {
            const selectedOrgIds = $(this).val();
            $procSelect.prop('disabled', true).empty().val(null).trigger('change.select2');
            
            if (selectedOrgIds && selectedOrgIds.length > 0) {
                const filteredProcesses = processes.filter(p => selectedOrgIds.includes(p.organizationId));
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $procSelect.append(new Option(proc.name, proc._id)));
                    $procSelect.prop('disabled', false);
                }
            }
        });
    }

    function renderAllocatedTasksAdmin() {
        const $tableBody = elements.allocatedTasksTableBody;
        $tableBody.empty();

        if (allocatedTasksData.length === 0) {
            $tableBody.append('<tr><td colspan="9" class="text-center">No tasks have been allocated yet.</td></tr>');
            return;
        }

        allocatedTasksData.forEach(task => {
            const employeeName = employees.find(e => e.id === task.assignedTo)?.name || '--';
            const statusBadge = getStatusBadge(task.status);

            const taskCompleteDateDisplay = task.taskCompletedDate ? new Date(task.taskCompletedDate).toLocaleDateString('en-GB') : '--';
            const assignedDateDisplay = new Date(task.assignedDate).toLocaleDateString('en-GB');
            const dueDateDisplay = new Date(task.dueDate).toLocaleDateString('en-GB');

            const toggleBtnClass = task.isActive ? 'btn-danger' : 'btn-success';
            const toggleBtnIcon = task.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const toggleBtnHtml = `<button class="btn btn-sm ${toggleBtnClass} toggle-allocated-task-status-btn" data-id="${task.id}" data-status="${!task.isActive}" title="${task.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${toggleBtnIcon}"></i></button>`;

            const editBtnHtml = `<button class="btn btn-sm btn-primary edit-allocated-task-btn me-2" data-id="${task.id}" title="Edit Task"><i class="fas fa-edit"></i></button>`;


            const rowHtml = `
                <tr data-id="${task.id}">
                    <td>${task.id}</td>
                    <td>${employeeName}</td>
                    <td>${assignedDateDisplay}</td>
                    <td>${taskCompleteDateDisplay}</td>
                    <td>${dueDateDisplay}</td>
                    <td>${task.task}</td>
                    <td>${task.remark || 'No remark yet'}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="d-flex align-items-center"> ${editBtnHtml}
                            ${toggleBtnHtml}
                        </div>
                    </td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });

        $tableBody.off('click').on('click', '.toggle-allocated-task-status-btn', function() {
            const taskId = $(this).data('id');
            const newStatus = $(this).data('status');
            toggleAllocatedTaskActivation(taskId, newStatus);
        }).on('click', '.edit-allocated-task-btn', function() {
            const taskId = $(this).data('id');
            const allocatedTask = allocatedTasksData.find(t => t.id === taskId);
            if (allocatedTask) {
                populateAllocatedTaskEditModal(allocatedTask);
                $('#allocatedTaskEditModal').modal('show');
            } else {
                alert('Allocated Task not found.');
            }
        });
    }

    function populateAllocatedTaskEditModal(task) {
        $('#editAllocatedTaskModalId').text(task.id);
        $('#currentEditAllocatedTaskId').val(task.id);

        const employeeName = employees.find(e => e.id === task.assignedTo)?.name || '--';
        elements.editAllocatedTaskEmployeeSelect.empty().append(new Option(employeeName, task.assignedTo)).trigger('change.select2');

        $('#editAllocatedDueDate').val(task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '');
        $('#editAllocatedTaskDescription').val(task.task || '');
        // **Removed 'Emp. Remark' and 'Status' fields from the modal's population logic**
        // $('#editAllocatedRemark').val(task.remark || '');
        // $('#editAllocatedTaskStatus').val(task.status || 'Pending');

        $('#editAllocatedDueDate').datepicker({ dateFormat: 'dd/mm/yy' });
    }

    async function saveAllocatedTaskChanges() {
        const taskId = $('#currentEditAllocatedTaskId').val();
        const taskIndex = allocatedTasksData.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            alert('Allocated Task not found for updating.');
            return;
        }

        const newDueDateStr = $('#editAllocatedDueDate').val();
        const newDescription = $('#editAllocatedTaskDescription').val().trim();

        if (!newDueDateStr || !newDescription) {
            alert('Due Date and Task Description are required.');
            return;
        }

        // **Only update fields that can be changed by the admin**
        const updatedTask = {
            ...allocatedTasksData[taskIndex],
            dueDate: formatDateToISO(newDueDateStr),
            task: newDescription,
        };

        try {
            await makeAuthRequest('/admin/allocated_tasks', 'PUT', updatedTask);
            alert(`Allocated Task ${taskId} updated successfully (simulated)!`);
            $('#allocatedTaskEditModal').modal('hide');
            renderAllocatedTasksAdmin();
        } catch (error) {
            console.error(`Failed to save allocated task changes:`, error);
            alert('Error saving allocated task changes: ' + error.message);
        }
    }

    window.setAllocatedTaskStatus = async function(taskId, newStatus, remark = '') {
        const taskIndex = allocatedTasksData.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            alert(`Task ${taskId} not found in allocated tasks.`);
            return;
        }

        allocatedTasksData[taskIndex].status = newStatus;
        allocatedTasksData[taskIndex].remark = remark;

        if (newStatus === 'Completed') {
            allocatedTasksData[taskIndex].taskCompletedDate = new Date().toISOString().split('T')[0];
        } else {
            allocatedTasksData[taskIndex].taskCompletedDate = null;
        }

        await makeAuthRequest('/admin/allocated_tasks', 'PUT', allocatedTasksData[taskIndex]);

        alert(`Simulated status update for Task ${taskId}: Status to "${newStatus}", Remark: "${remark || 'None'}".`);
        renderAllocatedTasksAdmin();
    };

    async function toggleAllocatedTaskActivation(taskId, newStatus) {
        const taskIndex = allocatedTasksData.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            alert('Allocated Task not found.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE allocated task ${taskId}?`
            : `Are you sure you want to DEACTIVATE allocated task ${taskId}?`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            const updatedTask = { ...allocatedTasksData[taskIndex], isActive: newStatus };
            await makeAuthRequest('/admin/allocated_tasks', 'PUT', updatedTask);

            allocatedTasksData[taskIndex].isActive = newStatus;

            alert(`Allocated Task ${taskId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
            renderAllocatedTasksAdmin();
        } catch (error) {
            console.error(`Failed to toggle allocated task activation for ${taskId}:`, error);
            alert(`Error toggling allocated task status: ${error.message}`);
        }
    }


    function renderHourlyUpdatesAdminTable() {
        const $tableBody = elements.hourlyUpdatesAdminTableBody;
        $tableBody.empty();

        if (hourlyUpdatesAdmin.length === 0) {
            $tableBody.append('<tr><td colspan="8" class="text-center">No hourly updates submitted by employees yet.</td></tr>');
            return;
        }

        const sortedUpdates = [...hourlyUpdatesAdmin].sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.timeSlot.split('-')[0].replace('AM', ' AM').replace('PM', ' PM')}`);
            const dateB = new Date(`${b.date} ${b.timeSlot.split('-')[0].replace('AM', ' AM').replace('PM', ' PM')}`);

            if (dateA.getTime() !== dateB.getTime()) {
                return dateB.getTime() - dateA.getTime();
            }
            return a.timeSlot.localeCompare(b.timeSlot);
        });

        const employeeMap = new Map(employees.map(emp => [emp.id, emp.name]));
        const processMap = new Map(processes.map(proc => [proc._id, proc.name]));

        const rows = sortedUpdates.map(entry => {
            const formattedDate = new Date(entry.date).toLocaleDateString('en-GB');
            const employeeName = employeeMap.get(entry.employeeId) || '--';
            const processName = processMap.get(entry.processId) || '--';

            return `
                <tr>
                    <td>${formattedDate}</td>
                    <td>${entry.timeSlot}</td>
                    <td>${employeeName}</td>
                    <td>${processName}</td>
                    <td>${entry.calls || 0}</td>
                    <td>${entry.prospects || 0}</td>
                    <td>${entry.wonCases || 0}</td>
                    <td>${(entry.sales || 0).toFixed(2)}</td>
                </tr>
            `;
        }).join('');
        $tableBody.html(rows);
    }

    function showSection(sectionId, updateUrl = true) {
        $('.content-section').addClass('d-none');
        $(`#${sectionId}-section`).removeClass('d-none');
        elements.mainNavbar.find('.nav-link, .dropdown-item').removeClass('active');

        const $targetNavLink = elements.mainNavbar.find(`[data-section="${sectionId}"]`);

        if ($targetNavLink.length) {
            $targetNavLink.addClass('active');
            if ($targetNavLink.hasClass('dropdown-item')) {
                $targetNavLink.closest('.dropdown').find('.dropdown-toggle').addClass('active');
            }
        } else {
            elements.mainNavbar.find('.nav-link[data-section="manage-user"]').addClass('active');
        }

        if (updateUrl) {
            history.pushState(null, '', `#${sectionId}`);
        }

        switch (sectionId) {
            case 'manage-user':
                loadEmployees();
                break;
            case 'masters':
                const activeTabButton = document.querySelector('#masterTabs button.active');
                const masterType = activeTabButton ? activeTabButton.dataset.masterPane : 'employee-master';
                switch (masterType) {
                    case 'employee-master': 
                        loadEmployeesMaster();
                        setupEmployeeMasterCascades();
                        $('#addEmployeeForm')[0].reset();
                        $('#employeeOrganizationSelect, #employeeProcessSelect').val(null).trigger('change.select2');
                        break;
                    case 'organization-master': loadOrganizations(); break;
                    case 'process-master': loadProcesses(); break;
                    case 'campaign-master': loadCampaigns(); break;
                }
                break;
            case 'create-task':
                setupCreateTaskCascades();
                initializeTaskAssignmentBuilders();
                $('#createTaskForm')[0].reset();
                initializeUIComponents();
                break;
            case 'all-tasks':
            case 'view-update-tasks':
                // Reset filters for the active task view
                currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', campaign: '', status: '' };

                // Determine which search input to clear based on the active section
                if (sectionId === 'all-tasks') {
                    elements.universalTaskSearchInput.val('');
                } else if (sectionId === 'view-update-tasks') {
                    elements.viewTaskSearchInput.val('');
                }

                elements.universalFilterForm[0].reset();
                $('.select2-enabled-filter').val(null).trigger('change.select2');
                $('.datepicker-filter').val('');
                applyFiltersAndRenderTasks();
                break;
            case 'hourly-updates-admin':
                renderHourlyUpdatesAdminTable();
                break;
            case 'task-allocation':
                populateDropdown(elements.allocateEmployeeSelect, employees.filter(emp => emp.isActive), 'id', 'name', 'Select Employee', false);
                renderAllocatedTasksAdmin();
                break;
        }
    }

    $(document).ready(() => {
        console.log("DOM Content Loaded - admin_dashboard.js started.");
        initializeUIComponents();
        updateAllDashboardDropdowns();

        const initialHash = window.location.hash.substring(1);
        const validSection = $(`#${initialHash}-section`).length ? initialHash : 'manage-user';
        showSection(validSection, false);

        elements.mainNavbar.on('click', '.nav-link, .dropdown-item', function(e) {
            if ($(this).hasClass('dropdown-toggle')) return;
            e.preventDefault();
            const targetSection = $(this).data('section');
            if (targetSection) showSection(targetSection, true);
        });

        $('#masterTabs').on('shown.bs.tab', 'button[data-bs-toggle="tab"]', function(e) {
            const masterType = $(e.target).data('master-pane');
            switch (masterType) {
                case 'employee-master':
                    loadEmployeesMaster();
                    setupEmployeeMasterCascades();
                    break;
                case 'organization-master': loadOrganizations(); break;
                case 'process-master': loadProcesses(); break;
                case 'campaign-master': loadCampaigns(); break;
            }
        });

        $('#addEmployeeForm').on('submit', function(e) {
            e.preventDefault();
            const employeeId = $('#employeeId').val().trim();
            const employeeName = $('#employeeName').val().trim();
            const employeeDesignation = $('#employeeDesignation').val().trim();
            const employeeDepartment = $('#employeeDepartment').val().trim();
            const employeeLocation = $('#employeeLocation').val().trim();
            const employeeLangKnown = $('#employeeLangKnown').val().trim();
            const employeeType = $('#employeeType').val();
            const employeeOrganizations = $('#employeeOrganizationSelect').val();
            const employeeProcesses = $('#employeeProcessSelect').val();
            if (!employeeId || !employeeName || !employeeDesignation || !employeeDepartment || !employeeLocation || !employeeLangKnown || !employeeType || !employeeOrganizations || employeeOrganizations.length === 0 || !employeeProcesses || employeeProcesses.length === 0) { alert('Please fill in all fields for the new employee.'); return; }
            if (employees.some(emp => emp.id === employeeId)) { alert('Employee ID must be unique. Please use a different ID.'); return; }
            const newEmployee = { id: employeeId, name: employeeName, designation: employeeDesignation, department: employeeDepartment, location: employeeLocation, langKnown: employeeLangKnown, employeeType: employeeType, organizations: employeeOrganizations, processes: employeeProcesses, isActive: true, username: null, password: null, role: null };
            employees.push(newEmployee);
            alert('Employee added successfully!');
            $(this)[0].reset();
            $('#employeeOrganizationSelect, #employeeProcessSelect').val(null).trigger('change.select2');
            loadEmployeesMaster();
            loadEmployees();
            updateAllDashboardDropdowns();
        });
        
        $('#manageLoginForm').on('submit', function(e) {
            e.preventDefault();
            const username = $('#username').val().trim();
            const password = $('#password').val().trim();
            const role = $('#userRole').val();
            if (!username || !password || !role) { alert('Username, Password, and Role are required for login creation.'); return; }
            const targetEmployee = employees.find(e => e.id === $('#loginEmployeeId').val());
            if (!targetEmployee) { alert('Please select an Employee.'); return; }
            if (employees.some(e => e.username === username && e.id !== targetEmployee.id)) {
                alert('Username already exists for another user. Please choose a different username.');
                return;
            }
            targetEmployee.username = username;
            targetEmployee.password = password;
            targetEmployee.role = role;
            alert(`Login for ${targetEmployee.name} created/updated successfully!`);
            $(this)[0].reset();
            $('#loginEmployeeId').val('').trigger('change.select2');
            loadEmployeesMaster();
            loadEmployees();
            updateAllDashboardDropdowns();
        });

        // Other event listeners remain the same...

        $('#enableProfileEditBtn').on('click', function() {
            const isEditing = $(this).text() === 'Edit';
            toggleProfileEditMode(isEditing);
        });

        $('#updateProfileBtn').on('click', updateEmployeeProfile);

    });
})(jQuery);
