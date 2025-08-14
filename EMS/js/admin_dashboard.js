(function($) {
    "use strict";

    // --- Global Data Stores (Mock Data) ---
    let employees = [
        { id: 'EMP001', name: 'Kirti Agrawal', designation: 'Manager', department: 'Sales', organizations: ['CO001'], processes: ['PRO001'], isActive: true, username: 'kirti.a', password: 'password123', role: 'employee', location: 'Delhi', langKnown: 'Hindi, English', employeeType: 'On Roll' },
        { id: 'EMP002', name: 'Harpreet Kaur', designation: 'Analyst', department: 'Marketing', organizations: ['CO002'], processes: ['PRO002'], isActive: true, username: 'harpreet.k', password: 'password123', role: 'employee', location: 'Mumbai', langKnown: 'English, Punjabi', employeeType: 'Consultant' },
        { id: 'EMP003', name: 'Chandani', designation: 'Developer', department: 'IT', organizations: ['CO001', 'CO002'], processes: ['PRO001', 'PRO003'], isActive: false, username: null, password: null, role: null, location: 'Bangalore', langKnown: 'Hindi, English', employeeType: 'Intern - Short Term' },
        { id: 'EMP004', name: 'Raj Patel', designation: 'Sales Rep', department: 'Sales', organizations: ['CO002'], processes: ['PRO002'], isActive: true, username: null, password: null, role: null, location: 'Gujarat', langKnown: 'Gujarati, English', employeeType: 'On Roll' },
        { id: 'adminaccount', name: 'Admin', designation: '--', department: '--', organizations: [], processes: [], isActive: true, username: 'admin', password: 'adminpassword', role: 'admin', location: 'Headquarters', langKnown: 'English', employeeType: 'On Roll' }
    ];

    let organizations = [
        { _id: 'CO001', name: 'Legrand', isActive: true },
        { _id: 'CO002', name: 'Accutech', isActive: true },
        { _id: 'CO003', name: 'Global Corp', isActive: false }
    ];

    let processes = [
        { _id: 'PRO001', name: 'Legrand_CRM', organizationId: 'CO001', isActive: true },
        { _id: 'PRO002', name: 'Numeric_AMC', organizationId: 'CO002', isActive: true },
        { _id: 'PRO003', name: 'Numeric_Product', organizationId: 'CO002', isActive: false }
    ];

    let campaigns = [
        { _id: 'CAMP001', name: 'Bulk order', organizationId: 'CO001', processId: 'PRO001', isActive: true },
        { _id: 'CAMP002', name: 'Home Automation', organizationId: 'CO001', processId: 'PRO001', isActive: true },
        { _id: 'CAMP003', name: 'Legrand_eShop', organizationId: 'CO002', processId: 'PRO002', isActive: false }
    ];

    let allTasksData = [
        {
            id: 'TID001', taskDate: '2025-07-17', organization: 'CO001', process: 'PRO001', assignedToEmployee: 'EMP001', status: 'Pending', generalComment: 'Initial task for Q3 sales.', isActive: true,
            leads: { dateFrom: '2025-07-01', dateTo: '2025-07-05', month: 'Jul', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 100, convertToProspects: 10, comment: 'Initial lead engagement', assignments: ['date-2025-07-01-2025-07-05', 'month-Jul-2025', 'region-North', 'campaign-CAMP001'] },
            prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID002', taskDate: '2025-07-16', organization: 'CO002', process: 'PRO002', assignedToEmployee: 'EMP002', status: 'Under Process', generalComment: 'Follow up on product inquiries.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-06', dateTo: '2025-07-10', month: 'Jul', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToWon: 2, employeeSaleTarget: 250000, comment: 'Client signed up.', assignments: ['date-2025-07-06-2025-07-10', 'month-Jul-2025', 'region-East', 'campaign-CAMP003'] },
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 125000
        },
        {
            id: 'TID003', taskDate: '2025-07-18', organization: 'CO001', process: 'PRO001', assignedToEmployee: 'EMP003', status: 'Completed', generalComment: 'CRM system update analysis.', isActive: false,
            leads: { dateFrom: '2025-06-15', dateTo: '2025-06-20', month: 'Jun', year: '2025', region: 'South', campaign: 'CAMP002', quantity: 50, convertToProspects: 5, comment: 'Reviewed current CRM usage.' , assignments: ['date-2025-06-15-2025-06-20', 'month-Jun-2025', 'region-South', 'campaign-CAMP002']},
            prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID004', taskDate: '2025-07-15', organization: 'CO002', process: 'PRO003', assignedToEmployee: 'EMP004', status: 'On Hold', generalComment: 'Launch new product line campaign.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-01', dateTo: '2025-07-07', month: 'Jul', year: '2025', region: 'West', campaign: 'CAMP003', quantity: 15, convertToWon: 3, employeeSaleTarget: 300000, comment: 'Awaiting final creative assets.' , assignments: ['date-2025-07-01-2025-07-07', 'month-Jul-2025', 'region-West', 'campaign-CAMP003']},
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 100000
        },
        {
            id: 'TID005', taskDate: '2025-07-19', organization: 'CO001', process: 'PRO001', assignedToEmployee: 'EMP001', status: 'Pending', generalComment: 'Follow up on key accounts in North region.', isActive: true,
            leads: { dateFrom: '2025-07-10', dateTo: '2025-07-15', month: 'Jul', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 75, convertToProspects: 8, comment: 'Initial contact made with 5 accounts.', assignments: ['date-2025-07-10-2025-07-15', 'month-Jul-2025', 'region-North', 'campaign-CAMP001'] },
            prospects: null, activeLeadsToProspects: 2, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID006', taskDate: '2025-07-20', organization: 'CO002', process: 'PRO002', assignedToEmployee: 'EMP002', status: 'Under Process', generalComment: 'Analyze market trends for Q3.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-15', dateTo: '2025-07-20', month: 'Jul', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 8, convertToWon: 1, employeeSaleTarget: 150000, comment: 'Gathering data, preliminary findings positive.' , assignments: ['date-2025-07-15-2025-07-20', 'month-Jul-2025', 'region-East', 'campaign-CAMP003'] },
            activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0
        }
    ];

    let hourlyUpdatesAdmin = [
        { date: '2025-07-30', timeSlot: '09:30AM-10:30AM', employeeId: 'EMP001', organizationId: 'CO001', processId: 'PRO001', calls: 5, prospects: 2, wonCases: 1, sales: 50000 },
        { date: '2025-07-30', timeSlot: '10:30AM-11:30AM', employeeId: 'EMP001', organizationId: 'CO001', processId: 'PRO001', calls: 10, prospects: 3, wonCases: 0, sales: 0 },
        { date: '2025-07-30', timeSlot: '11:30AM-12:30PM', employeeId: 'EMP002', organizationId: 'CO002', processId: 'PRO002', calls: 8, prospects: 1, wonCases: 0, sales: 0 },
        { date: '2025-07-31', timeSlot: '09:30AM-10:30AM', employeeId: 'EMP001', organizationId: 'CO001', processId: 'PRO001', calls: 7, prospects: 2, wonCases: 0, sales: 10000 }
    ];
    
    // Performance data for the new report
    let performanceData = [
        { date: '2025-07-15', employeeId: 'EMP001', organizationId: 'CO001', processId: 'PRO001', targetProspects: 20, targetWon: 5, targetSales: 1500000, achievedProspects: 15, achievedWon: 4, achievedSales: 1200000 },
        { date: '2025-07-15', employeeId: 'EMP002', organizationId: 'CO002', processId: 'PRO002', targetProspects: 15, targetWon: 3, targetSales: 500000, achievedProspects: 10, achievedWon: 2, achievedSales: 0 },
        { date: '2025-07-16', employeeId: 'EMP001', organizationId: 'CO001', processId: 'PRO001', targetProspects: 25, targetWon: 7, targetSales: 2500000, achievedProspects: 20, achievedWon: 6, achievedSales: 2000000 }
    ];

    let dailyWorkReportData = [
        { date: '2025-07-15', employeeId: 'EMP001', organizationId: 'CO001', processId: 'PRO001', prospects: 5, wonCases: 2, sales: 1500000, achievedCalls: 15, achievedProspects: 4, achievedWon: 1, achievedSales: 1200000 },
        { date: '2025-07-15', employeeId: 'EMP002', organizationId: 'CO002', processId: 'PRO002', prospects: 3, wonCases: 1, sales: 500000, achievedCalls: 10, achievedProspects: 2, achievedWon: 0, achievedSales: 0 },
        { date: '2025-07-16', employeeId: 'EMP001', organizationId: 'CO001', processId: 'PRO001', prospects: 7, wonCases: 3, sales: 2500000, achievedCalls: 20, achievedProspects: 6, achievedWon: 2, achievedSales: 2000000 }
    ];

    let allocatedTasksData = [
        { id: 'ATID001', assignedTo: 'EMP001', assignedDate: '2025-07-25', taskCompletedDate: '2025-07-29', dueDate: '2025-07-30', task: 'Prepare weekly sales report.', remark: 'Report generated and sent to management.', status: 'Completed', isActive: true },
        { id: 'ATID002', assignedTo: 'EMP002', assignedDate: '2025-07-25', taskCompletedDate: '2025-07-28', dueDate: '2025-07-28', task: 'Follow up with client X.', remark: 'Client signed up for the new plan.', status: 'Completed', isActive: true },
        { id: 'ATID003', assignedTo: 'EMP001', assignedDate: '2025-07-20', taskCompletedDate: null, dueDate: '2025-07-26', task: 'Review Q2 performance.', remark: 'Pending data validation.', status: 'Pending', isActive: true },
        { id: 'ATID004', assignedTo: 'EMP004', assignedDate: '2025-07-21', taskCompletedDate: null, dueDate: '2025-07-27', task: 'Draft marketing email for new product.', remark: 'Initial draft sent for review.', status: 'Under Process', isActive: true },
        { id: 'ATID005', assignedTo: 'EMP002', assignedDate: '2025-07-22', taskCompletedDate: null, dueDate: '2025-07-29', task: 'Update customer contact details.', remark: 'Awaiting updated contact list from IT.', status: 'On hold', isActive: true },
        { id: 'ATID006', assignedTo: 'EMP003', assignedDate: '2025-07-23', taskCompletedDate: '2025-07-29', dueDate: '2025-07-29', task: 'Perform system security audit.', remark: 'Completed audit, found no critical issues.', status: 'Completed', isActive: false },
    ];


    let allTasksCurrentFilters = { fromDate: '', toDate: '', employee: '', organization: '', process: '' };
    let dailyWorkCurrentFilters = { fromDate: '', toDate: '', employee: '', organization: '', process: '' };
    let editingProfile = null;

    // --- Caching DOM Elements ---
    const elements = {
        mainNavbar: $('#main-admin-navbar'),
        employeesTableBody: $('#employeesTableBody'),
        employeeMasterTableBody: $('#employeeMasterTableBody'),
        organizationsTableBody: $('#organizationsTableBody'),
        processesTableBody: $('#processesTableBody'),
        campaignsTableBody: $('#campaignsTableBody'),
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
        loginEmployeeId: $('#loginEmployeeId'),
        profileEmployeeOrganization: $('#profileEmployeeOrganization'),
        profileEmployeeProcesses: $('#profileEmployeeProcesses'),
        allocatedTaskStatusFilter: $('#allocatedTaskStatusFilter'),
        hourlyReportFromDate: $('#hourlyReportFromDate'),
        hourlyReportToDate: $('#hourlyReportToDate'),
        downloadHourlyReportBtn: $('#downloadHourlyReportBtn'),
        dailyWorkFromDate: $('#dailyWorkFromDate'),
        dailyWorkToDate: $('#dailyWorkToDate'),
        dailyWorkFilterEmployee: $('#dailyWorkFilterEmployee'),
        dailyWorkFilterOrganization: $('#dailyWorkFilterOrganization'),
        dailyWorkFilterProcess: $('#dailyWorkFilterProcess'),
        applyDailyWorkFilterBtn: $('#applyDailyWorkFilterBtn'),
        downloadDailyWorkReportBtn: $('#downloadDailyWorkReportBtn'),
        clearDailyWorkFiltersBtn: $('#clearDailyWorkFiltersBtn'),
        hourlyReportFilterEmployee: $('#hourlyReportFilterEmployee'),
        hourlyReportFilterOrganization: $('#hourlyReportFilterOrganization'),
        hourlyReportFilterProcess: $('#hourlyReportFilterProcess'),
        assignEmployeeSelect: $('#assignEmployeeSelect'),
        assignOrganizationSelect: $('#assignOrganizationSelect'),
        assignProcessSelect: $('#assignProcessSelect'),
        taskAllocatedFilterEmployee: $('#taskAllocatedFilterEmployee'),
        taskAllocatedFromDate: $('#taskAllocatedFromDate'),
        taskAllocatedToDate: $('#taskAllocatedToDate'),
        taskAllocatedFilterStatus: $('#taskAllocatedFilterStatus'),
        applyTaskAllocatedFilterBtn: $('#applyTaskAllocatedFilterBtn'),
        clearTaskAllocatedFiltersBtn: $('#clearTaskAllocatedFiltersBtn'),
        downloadTaskAllocatedReportBtn: $('#downloadTaskAllocatedReportBtn'),
        taskAllocatedReportTableBody: $('#taskAllocatedReportTableBody'),
        performanceReportTableBody: $('#performanceReportTableBody'),
        performanceFromDate: $('#performanceFromDate'),
        performanceToDate: $('#performanceToDate'),
        performanceFilterEmployee: $('#performanceFilterEmployee'),
        performanceFilterOrganization: $('#performanceFilterOrganization'),
        performanceFilterProcess: $('#performanceFilterProcess'),
        applyPerformanceFilterBtn: $('#applyPerformanceFilterBtn'),
        clearPerformanceFiltersBtn: $('#clearPerformanceFiltersBtn'),
        downloadPerformanceReportBtn: $('#downloadPerformanceReportBtn'),
        leadsTarget: $('#leadsTarget'),
        leadsAchieved: $('#leadsAchieved'),
        leadsScore: $('#leadsScore'),
        prospectsTarget: $('#prospectsTarget'),
        prospectsAchieved: $('#prospectsAchieved'),
        prospectsScore: $('#prospectsScore'),
        salesTarget: $('#salesTarget'),
        salesAchieved: $('#salesAchieved'),
        salesScore: $('#salesScore'),
        overallScore: $('#overallScore')
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
    
    function getSelectionsFromListbox(listboxId) {
        const listbox = document.getElementById(listboxId);
        if (!listbox) {
            console.error(`Listbox with ID ${listboxId} not found.`);
            return [];
        }
        return Array.from(listbox.options).map(option => option.value);
    }
    
    function getStatusBadge(status) {
        let badgeClass = 'bg-secondary';
        switch (status) {
            case 'Pending': badgeClass = 'bg-warning text-dark'; break;
            case 'Under Process': badgeClass = 'bg-info text-dark'; break;
            case 'Completed': badgeClass = 'bg-success'; break;
            case 'On hold': badgeClass = 'bg-danger'; break;
            case 'Overdue': badgeClass = 'bg-danger'; break;
        }
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }

    function formatIndianRupees(value) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }
        const amount = Math.round(value);
        return amount.toLocaleString('en-IN');
    }

    function formatIndianLacs(value) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }
        const amount = Math.round(value / 100000);
        return amount.toLocaleString('en-IN');
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
                        if (empIndex !== -1) {
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
        populateDropdown(elements.taskOrganizationSelect, organizations, '_id', 'name', 'Select Organization');
        populateDropdown(elements.employeeOrganizationSelect, organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#processOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#campaignOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown(elements.filterOrganization, organizations, '_id', 'name', 'All Organization', true);
        populateDropdown(elements.editOrganization, organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#editProcessOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#editCampaignProcessSelect'), processes, '_id', 'name', 'Select Process');
        populateDropdown(elements.dailyWorkFilterOrganization, organizations, '_id', 'name', 'All', true);
        populateDropdown(elements.hourlyReportFilterOrganization, organizations, '_id', 'name', 'All', true);
        populateDropdown(elements.performanceFilterOrganization, organizations, '_id', 'name', 'All', true);
        
        const activeProcesses = processes.filter(p => p.isActive);
        populateDropdown(elements.filterProcess, activeProcesses, '_id', 'name', 'All Process', true);
        populateDropdown(elements.editProcess, activeProcesses, '_id', 'name', 'Select Process');
        populateDropdown(elements.dailyWorkFilterProcess, activeProcesses, '_id', 'name', 'All', true);
        populateDropdown(elements.hourlyReportFilterProcess, activeProcesses, '_id', 'name', 'All', true);
        populateDropdown(elements.performanceFilterProcess, activeProcesses, '_id', 'name', 'All', true);

        const activeEmployees = employees.filter(emp => emp.isActive);
        populateDropdown(elements.taskEmployeeSelect, activeEmployees, 'id', 'name', 'Select Employee');
        populateDropdown(elements.filterEmployee, activeEmployees, 'id', 'name', 'All Employees', true);
        populateDropdown(elements.editEmployee, activeEmployees, 'id', 'name', 'Select Employee');
        populateDropdown($('#editAllocatedTaskEmployeeSelect'), activeEmployees, 'id', 'name', 'Select Employee');
        populateDropdown(elements.dailyWorkFilterEmployee, activeEmployees, 'id', 'name', 'All', true);
        populateDropdown(elements.hourlyReportFilterEmployee, activeEmployees, 'id', 'name', 'All', true);
        populateDropdown(elements.performanceFilterEmployee, activeEmployees, 'id', 'name', 'All', true);
        
        const allEmployees = employees.filter(emp => emp.id !== 'adminaccount');
        populateDropdown(elements.loginEmployeeId, allEmployees, 'id', 'name', 'Select Employee');
        populateDropdown(elements.taskAllocatedFilterEmployee, allEmployees, 'id', 'name', 'All', true);
        
        const activeCampaigns = campaigns.filter(c => c.isActive);
        populateDropdown(elements.leadsQuantityCampaignMaster, activeCampaigns, '_id', 'name', 'Select Campaign');
        populateDropdown(elements.prospectsQuantityCampaignMaster, activeCampaigns, '_id', 'name', 'Select Campaign');
        populateDropdown(elements.editLeadsCampaign, activeCampaigns, '_id', 'name', 'Select Campaign');
        populateDropdown(elements.editProspectsCampaign, activeCampaigns, '_id', 'name', 'Select Campaign');
        populateDropdown(elements.filterCampaign, activeCampaigns, '_id', 'name', 'All Campaigns', true);

        const statusOptions = [
            {value: 'Pending', text: 'Pending'},
            {value: 'Under Process', text: 'Under Process'},
            {value: 'Completed', text: 'Completed'},
            {value: 'On hold', text: 'On Hold'}
        ];
        populateDropdown(elements.filterStatus, statusOptions, 'value', 'text', 'All Statuses', true);

        const allocatedStatusOptions = [
            {value: 'Pending', text: 'Pending'},
            {value: 'Under Process', text: 'Under Process'},
            {value: 'Completed', text: 'Completed'},
            {value: 'On hold', text: 'On Hold'}
        ];
        populateDropdown(elements.allocatedTaskStatusFilter, allocatedStatusOptions, 'value', 'text', 'All', true);
        populateDropdown(elements.taskAllocatedFilterStatus, allocatedStatusOptions, 'value', 'text', 'All', true);

        populateDropdown(elements.profileEmployeeOrganization, organizations, '_id', 'name', 'Select Organization(s)', true);

        populateDropdown(elements.assignEmployeeSelect, allEmployees, 'id', 'name', 'Select Employee');
        populateDropdown(elements.assignOrganizationSelect, organizations, '_id', 'name', 'Select Organization(s)');
        populateDropdown(elements.assignProcessSelect, processes, '_id', 'name', 'Select Process(s)');
    }

    function initializeTaskAssignmentBuilders() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            years.push(i);
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        $('#leadsAssignmentYear, #prospectsAssignmentYear, #editLeadsAssignmentYear, #editProspectsAssignmentYear').each(function() {
            const $this = $(this);
            $this.empty();
            years.forEach(year => $this.append(new Option(year, year)));
            $this.val(currentYear);
        });

        $('#leadsAssignmentMonth, #prospectsAssignmentMonth, #editLeadsAssignmentMonth, #editProspectsAssignmentMonth').each(function() {
            const $this = $(this);
            $this.empty();
            $this.append('<option value="" disabled hidden>Select Month</option>');
            $this.append('<option value="All">All</option>');
            months.forEach(m => $this.append(new Option(m, m)));
            $this.val('');
        });

        $('#leadsAssignmentRegion, #prospectsAssignmentRegion, #editLeadsAssignmentRegion, #editProspectsAssignmentRegion').each(function() {
            const $this = $(this);
            $this.empty();
            $this.append('<option value="" disabled hidden>Select Region</option>');
            $this.append('<option value="All">All</option>');
            ['North', 'East', 'South', 'West'].forEach(region => $this.append(new Option(region, region)));
            $this.val('');
        });

        $('#leadsQuantityCampaignMaster, #prospectsQuantityCampaignMaster').each(function() {
            const $this = $(this);
            $this.empty();
            $this.append('<option value="" disabled hidden>Select Campaign</option>');
            $this.val('');
        });

        $('#leadsDateFrom, #leadsDateTo, #prospectsDateFrom, #prospectsDateTo, #leadsQty, #convertToProspects, #leadsComment, #prospectsQty, #convertToWon, #employeeSaleTarget, #prospectsComment').val('');
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
        
        const currentYear = new Date().getFullYear();

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
            const campaignValue = $(`#${listboxPrefix}QuantityCampaignMaster`).val() || $(`#${listboxPrefix}Campaign`).val();
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
            $(`#${listboxPrefix}AssignmentRegion`).val('');
        } else if (type === 'campaign') {
            $(`#${listboxPrefix}QuantityCampaignMaster`).val(null).trigger('change.select2');
            $(`#${listboxPrefix}Campaign`).val(null).trigger('change.select2');
        }
    }

    function renderEmployeesTable(tableBodyElement, isMasterTable) {
        console.log(`renderEmployeesTable() called for ${isMasterTable ? 'master' : 'details'} table.`);
        const $tableBody = $(tableBodyElement);
        if (!$tableBody.length) return;
        
        $tableBody.empty();
        
        const employeesToDisplay = employees.filter(emp => emp.id !== 'adminaccount');
        if (employeesToDisplay.length === 0) {
            $tableBody.append(`<tr><td colspan="7" class="text-center">No employees available.</td></tr>`);
            return;
        }

        employeesToDisplay.forEach(emp => {
            const orgNames = (emp.organizations || []).map(orgId => organizations.find(o => o._id === orgId)?.name).filter(Boolean).join(', ') || '--';
            const processNames = (emp.processes || []).map(procId => processes.find(p => p._id === procId)?.name).filter(Boolean).join(', ') || '--';
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
                    <td>${orgNames}</td>
                    <td>${processNames}</td>
                    <td>${emp.location || '--'}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td class="text-center">
                        ${profileBtnHtml}
                        ${toggleBtnHtml}
                    </td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });
    }

    function setupEmployeeTableHandlers() {
        elements.employeesTableBody.on('click', '.view-profile-btn', function() {
            const empId = $(this).data('id');
            const employee = employees.find(e => e.id === empId);
            if (employee) {
                populateProfileModal(employee);
                $('#employeeProfileModal').modal('show');
            }
        });

        elements.employeesTableBody.on('click', '.toggle-employee-status-btn', function() {
            const empId = $(this).data('id');
            const newStatus = $(this).data('status');
            toggleEmployeeActivation(empId, newStatus);
        });

        elements.employeeMasterTableBody.on('click', '.view-profile-btn', function() {
            const empId = $(this).data('id');
            const employee = employees.find(e => e.id === empId);
            if (employee) {
                populateProfileModal(employee);
                $('#employeeProfileModal').modal('show');
            }
        });

        elements.employeeMasterTableBody.on('click', '.toggle-employee-status-btn', function() {
            const empId = $(this).data('id');
            const newStatus = $(this).data('status');
            toggleEmployeeActivation(empId, newStatus);
        });
    }
    
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
        
        elements.profileEmployeeOrganization.empty();
        const allOrganizations = organizations.map(org => ({ value: org._id, text: org.name }));
        allOrganizations.forEach(org => elements.profileEmployeeOrganization.append(new Option(org.text, org.value)));
        elements.profileEmployeeOrganization.val(employee.organizations || []).trigger('change.select2');

        updateProcessesDropdown(employee.organizations, employee.processes);
        
        $('#profileLoginUsername').val(employee.username || '--');
        $('#profileLoginRole').val(employee.role || '').trigger('change');
        $('#profileEmployeeStatus').val(String(employee.isActive));
    
        toggleProfileEditMode(false);
    }
    
    function updateProcessesDropdown(selectedOrgIds, selectedProcIds = []) {
        const $procDropdown = elements.profileEmployeeProcesses;
        $procDropdown.empty();
        
        const allProcesses = processes.map(p => ({ value: p._id, text: p.name }));
        allProcesses.forEach(proc => $procDropdown.append(new Option(proc.text, proc.value)));

        if (selectedProcIds && selectedProcIds.length > 0) {
            $procDropdown.val(selectedProcIds).trigger('change.select2');
        } else {
            $procDropdown.val(null).trigger('change.select2');
        }
    }


    function toggleProfileEditMode(isEditMode) {
        const $formInputs = $('#editEmployeeProfileForm').find('input, select');
        const $editBtn = $('#enableProfileEditBtn');
        const $updateBtn = $('#updateProfileBtn');
        
        const $profileOrgSelect = elements.profileEmployeeOrganization;
        const $profileProcSelect = elements.profileEmployeeProcesses;
        const $profileLoginRoleSelect = $('#profileLoginRole');

        if (isEditMode) {
            $formInputs.prop('disabled', false);
            $profileOrgSelect.prop('disabled', false);
            $profileProcSelect.prop('disabled', false);
            $('#profileLoginUsername').prop('disabled', true);
            $profileLoginRoleSelect.prop('disabled', false);

            $updateBtn.removeClass('d-none');
            $editBtn.text('Cancel');
        } else {
            $formInputs.prop('disabled', true);
            $profileOrgSelect.prop('disabled', true);
            $profileProcSelect.prop('disabled', true);
            $profileLoginRoleSelect.prop('disabled', true);

            $updateBtn.addClass('d-none');
            $editBtn.text('Edit');
        }
    }

    async function updateEmployeeProfile() {
        if (!editingProfile) return;
        
        const selectedOrganizations = elements.profileEmployeeOrganization.val();
        const selectedProcesses = elements.profileEmployeeProcesses.val();

        if (!selectedOrganizations || selectedOrganizations.length === 0) {
            alert('At least one organization is required.');
            return;
        }

        const updatedData = {
            id: editingProfile.id,
            name: $('#profileEmployeeName').val().trim(),
            designation: $('#profileEmployeeDesignation').val().trim(),
            department: $('#profileEmployeeDepartment').val().trim(),
            location: $('#profileEmployeeLocation').val().trim(),
            langKnown: $('#profileEmployeeLangKnown').val().trim(),
            employeeType: $('#profileEmployeeType').val(),
            organizations: selectedOrganizations,
            processes: selectedProcesses,
            username: $('#profileLoginUsername').val().trim(),
            role: $('#profileLoginRole').val(),
            isActive: $('#profileEmployeeStatus').val() === 'true'
        };

        if (Object.values(updatedData).some(v => !v && v !== false && (!Array.isArray(v) || v.length === 0))) {
             alert('Please fill in all required employee details fields.');
            return;
        }
        
        try {
            await makeAuthRequest('/admin/employees_full', 'PUT', updatedData);
            alert(`Employee ${updatedData.name}'s profile updated successfully (simulated)!`);

            const empIndex = employees.findIndex(e => e.id === updatedData.id);
            if (empIndex !== -1) {
                employees[empIndex] = { ...employees[empIndex], ...updatedData };
            }

            $('#employeeProfileModal').modal('hide');
            renderEmployeesTable(elements.employeesTableBody, false);
            renderEmployeesTable(elements.employeeMasterTableBody, true);
            updateAllDashboardDropdowns();
        } catch (error) {
            console.error('Failed to update employee profile:', error);
            alert('Error updating employee profile: ' + error.message);
        }
    }

    function toggleEmployeeActivation(empId, newStatus) {
        const employeeIndex = employees.findIndex(e => e.id === empId);
        if (employeeIndex === -1) {
            alert('Employee not found.');
            return;
        }

        if (empId === 'adminaccount') {
            alert('Cannot deactivate the main admin account.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE employee ${employees[employeeIndex].name}?`
            : `Are you sure you want to DEACTIVATE employee ${employees[employeeIndex].name}? Deactivated employees will lose access and not appear on dashboards.`;

        if (!confirm(confirmMessage)) {
            return;
        }

        employees[employeeIndex].isActive = newStatus;
        if (!newStatus) {
            employees[employeeIndex].username = null;
            employees[employeeIndex].password = null;
            employees[employeeIndex].role = null;
        }

        alert(`Employee ${employees[employeeIndex].name} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
        
        renderEmployeesTable(elements.employeesTableBody, false);
        renderEmployeesTable(elements.employeeMasterTableBody, true);
        updateAllDashboardDropdowns();
    }

    async function toggleMasterActivation(id, type, newStatus) {
        let dataArray, itemIndex, itemName;

        switch (type) {
            case 'organization':
                dataArray = organizations;
                itemIndex = organizations.findIndex(org => org._id === id);
                itemName = organizations[itemIndex]?.name;
                processes.filter(p => p.organizationId === id).forEach(p => p.isActive = newStatus);
                campaigns.filter(c => c.organizationId === id).forEach(c => c.isActive = newStatus);
                employees.filter(emp => emp.organizations.includes(id)).forEach(emp => emp.isActive = newStatus);
                break;
            case 'process':
                dataArray = processes;
                itemIndex = processes.findIndex(proc => proc._id === id);
                itemName = processes[itemIndex]?.name;
                campaigns.filter(c => c.processId === id).forEach(c => c.isActive = newStatus);
                break;
            case 'campaign':
                dataArray = campaigns;
                itemIndex = campaigns.findIndex(camp => camp._id === id);
                itemName = campaigns[itemIndex]?.name;
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

            if (type === 'organization') loadOrganizations();
            if (type === 'process') loadProcesses();
            if (type === 'campaign') loadCampaigns();
            
            renderEmployeesTable(elements.employeesTableBody, false);
            renderEmployeesTable(elements.employeeMasterTableBody, true);
            applyDailyWorkUpdatesFilter();
            updateAllDashboardDropdowns();

        } catch (error) {
            console.error(`Failed to toggle ${type} activation for ${id}:`, error);
            alert(`Error toggling ${type} status: ${error.message}`);
        }
    }


    function loadEmployees() {
        renderEmployeesTable(elements.employeesTableBody, false);
        updateAllDashboardDropdowns();
    }

    function loadEmployeesMaster() {
        renderEmployeesTable(elements.employeeMasterTableBody, true);
        updateAllDashboardDropdowns();
    }

    async function loadOrganizations() {
        const $tableBody = elements.organizationsTableBody;
        if (!$tableBody.length) return;
        $tableBody.empty();
        organizations.forEach(org => {
            const activationButtonClass = org.isActive ? 'btn-danger' : 'btn-success';
            const activationButtonIcon = org.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const row = `<tr><td>${org._id}</td><td>${org.name}</td>
                            <td>
                                <div class="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-sm btn-info edit-organization-btn me-2" data-id="${org._id}" data-name="${org.name}"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${org._id}" data-type="organization" data-status="${!org.isActive}" title="${org.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                                </div>
                            </td></tr>`;
            $tableBody.append(row);
        });
    }

    async function loadProcesses() {
        const $tableBody = elements.processesTableBody;
        if (!$tableBody.length) return;
        $tableBody.empty();
        processes.forEach(proc => {
            const orgName = organizations.find(o => o._id === proc.organizationId)?.name || '--';
            const activationButtonClass = proc.isActive ? 'btn-danger' : 'btn-success';
            const activationButtonIcon = proc.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const row = `<tr>
                <td>${proc._id}</td>
                <td>${orgName}</td>
                <td>${proc.name}</td>
                <td>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-sm btn-info edit-process-btn me-2" data-id="${proc._id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${proc._id}" data-type="process" data-status="${!proc.isActive}" title="${proc.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                    </div>
                </td>
                </tr>`;
            $tableBody.append(row);
        });
    }

    async function loadCampaigns() {
        const $tableBody = elements.campaignsTableBody;
        if (!$tableBody.length) return;
        $tableBody.empty();
        campaigns.forEach(camp => {
            const orgName = organizations.find(o => o._id === camp.organizationId)?.name || '--';
            const procName = processes.find(p => p._id === camp.processId)?.name || '--';
            const activationButtonClass = camp.isActive ? 'btn-danger' : 'btn-success';
            const activationButtonIcon = camp.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const row = `<tr>
                            <td>${camp._id}</td>
                            <td>${orgName}</td>
                            <td>${procName}</td>
                            <td>${camp.name}</td>
                            <td>
                                <div class="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-sm btn-info edit-campaign-btn me-2" data-id="${camp._id}"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${camp._id}" data-type="campaign" data-status="${!camp.isActive}" title="${camp.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                                </div>
                            </td>
                        </tr>`;
            $tableBody.append(row);
        });
    }
    
    function renderAllocatedTasksAdmin(filterStatus = '') {
        const $tableBody = elements.allocatedTasksTableBody;
        if (!$tableBody.length) return;
        $tableBody.empty();

        let tasksToRender = allocatedTasksData.filter(task => task.isActive);
        
        if (filterStatus && filterStatus !== 'All') {
            tasksToRender = tasksToRender.filter(task => task.status === filterStatus);
        }

        if (tasksToRender.length === 0) {
            $tableBody.append(`<tr><td colspan="9" class="text-center">No allocated tasks found.</td></tr>`);
            return;
        }

        tasksToRender.forEach(task => {
            const employeeName = employees.find(e => e.id === task.assignedTo)?.name || 'N/A';
            const assignedDate = task.assignedDate ? new Date(task.assignedDate).toLocaleDateString('en-GB') : '--';
            const completedDate = task.taskCompletedDate ? new Date(task.taskCompletedDate).toLocaleDateString('en-GB') : '--';
            const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '--';
            const statusHtml = getStatusBadge(task.status);
            
            const activationButtonClass = task.isActive ? 'btn-danger' : 'btn-success';
            const activationButtonIcon = task.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const toggleButtonHtml = `<button class="btn btn-sm ${activationButtonClass} toggle-allocated-task-status-btn" data-id="${task.id}" data-status="${!task.isActive}" title="${task.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>`;
            const editButtonHtml = `<button class="btn btn-sm btn-info edit-allocated-task-btn me-2" data-id="${task.id}"><i class="fas fa-edit"></i></button>`;

            const row = `
                <tr data-id="${task.id}">
                    <td>${task.id}</td>
                    <td>${task.task}</td>
                    <td>${employeeName}</td>
                    <td>${assignedDate}</td>
                    <td>${dueDate}</td>
                    <td>${completedDate}</td>
                    <td>${task.remark || '--'}</td>
                    <td>${statusHtml}</td>
                    <td class="d-flex justify-content-center align-items-center">
                        ${editButtonHtml}
                        ${toggleButtonHtml}
                    </td>
                </tr>
            `;
            $tableBody.append(row);
        });
    }

    function renderTaskAllocatedReport(filteredData) {
        const $tableBody = elements.taskAllocatedReportTableBody;
        if (!$tableBody.length) return;
        $tableBody.empty();

        if (filteredData.length === 0) {
            $tableBody.append(`<tr><td colspan="8" class="text-center">No allocated tasks found.</td></tr>`);
            return;
        }

        filteredData.forEach(task => {
            const employeeName = employees.find(e => e.id === task.assignedTo)?.name || 'N/A';
            const assignedDate = task.assignedDate ? new Date(task.assignedDate).toLocaleDateString('en-GB') : '--';
            const completedDate = task.taskCompletedDate ? new Date(task.taskCompletedDate).toLocaleDateString('en-GB') : '--';
            const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '--';
            const statusHtml = getStatusBadge(task.status);

            const row = `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.task}</td>
                    <td>${employeeName}</td>
                    <td>${assignedDate}</td>
                    <td>${dueDate}</td>
                    <td>${completedDate}</td>
                    <td>${task.remark || '--'}</td>
                    <td>${statusHtml}</td>
                </tr>
            `;
            $tableBody.append(row);
        });
    }

    function applyTaskAllocatedReportFilters() {
        let filteredData = allocatedTasksData.filter(task => task.isActive);

        const fromDateStr = elements.taskAllocatedFromDate.val();
        const toDateStr = elements.taskAllocatedToDate.val();
        const employeeId = elements.taskAllocatedFilterEmployee.val();
        const status = elements.taskAllocatedFilterStatus.val();
    
        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
    
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                 alert('Invalid date format. Please use DD/MM/YYYY.');
                 return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            
            filteredData = filteredData.filter(task => {
                const taskDate = parseDate(task.assignedDate);
                return (!fromDate || taskDate >= fromDate) && (!toDate || taskDate <= toDate);
            });
        }
        
        if (employeeId) {
            filteredData = filteredData.filter(task => task.assignedTo === employeeId);
        }

        if (status) {
            filteredData = filteredData.filter(task => task.status === status);
        }

        renderTaskAllocatedReport(filteredData);
    }

    function downloadTaskAllocatedReport() {
        let filteredData = allocatedTasksData.filter(task => task.isActive);

        const fromDateStr = elements.taskAllocatedFromDate.val();
        const toDateStr = elements.taskAllocatedToDate.val();
        const employeeId = elements.taskAllocatedFilterEmployee.val();
        const status = elements.taskAllocatedFilterStatus.val();

        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
            
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                alert('Invalid date format. Please use DD/MM/YYYY.');
                return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            
            filteredData = filteredData.filter(task => {
                const taskDate = parseDate(task.assignedDate);
                return (!fromDate || taskDate >= fromDate) && (!toDate || taskDate <= toDate);
            });
        }
        
        if (employeeId) {
            filteredData = filteredData.filter(task => task.assignedTo === employeeId);
        }

        if (status) {
            filteredData = filteredData.filter(task => task.status === status);
        }

        if (filteredData.length === 0) {
            alert('No data found for the selected date range and filters.');
            return;
        }

        const getEmployeeName = (empId) => employees.find(e => e.id === empId)?.name || '';
        
        const headers = ["Task ID", "Task", "Employee Name", "Assigned Date", "Due Date", "Task completed Date", "Remarks", "Status"];
        let csvContent = headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

        filteredData.forEach(task => {
            const row = [
                task.id,
                task.task,
                getEmployeeName(task.assignedTo),
                task.assignedDate ? new Date(task.assignedDate).toLocaleDateString('en-GB') : '',
                task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '',
                task.taskCompletedDate ? new Date(task.taskCompletedDate).toLocaleDateString('en-GB') : '',
                task.remark || '',
                task.status
            ];
            csvContent += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        
        const fromDateFileName = fromDateStr ? fromDateStr.replace(/\//g, '-') : 'all';
        const toDateFileName = toDateStr ? toDateStr.replace(/\//g, '-') : 'all';
        link.setAttribute("download", `task_allocated_report_${fromDateFileName}_to_${toDateFileName}.csv`);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    function renderDailyWorkReportTable(reportsToRender) {
        const $tableBody = elements.filteredTasksTableBody;
        if (!$tableBody.length) return;
        $tableBody.empty();

        const getEmployeeName = (empId) => employees.find(e => e.id === empId)?.name || '--';
        const getOrgName = (orgId) => organizations.find(o => o._id === orgId)?.name || '--';
        const getProcessName = (procId) => processes.find(p => p._id === procId)?.name || '--';

        if (reportsToRender.length === 0) {
            $tableBody.append(`<tr><td colspan="11" class="text-center">No daily work reports found.</td></tr>`);
            return;
        }

        reportsToRender.forEach(report => {
            const rowHtml = `
                <tr>
                    <td>${report.date ? new Date(report.date).toLocaleDateString('en-GB') : '--'}</td>
                    <td>${getEmployeeName(report.employeeId)}</td>
                    <td>${getOrgName(report.organizationId)}</td>
                    <td>${getProcessName(report.processId)}</td>
                    <td>${report.prospects || 0}</td>
                    <td>${report.wonCases || 0}</td>
                    <td>${formatIndianRupees(report.sales)}</td>
                    <td>${report.achievedCalls || 0}</td>
                    <td>${report.achievedProspects || 0}</td>
                    <td>${report.achievedWon || 0}</td>
                    <td>${formatIndianRupees(report.achievedSales)}</td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });
    }
    
    function renderPerformanceReportCards(reportsToRender) {
        const allMetrics = reportsToRender.reduce((acc, report) => {
            acc.targetProspects += report.targetProspects || 0;
            acc.targetWon += report.targetWon || 0;
            acc.targetSales += report.targetSales || 0;
            acc.achievedProspects += report.achievedProspects || 0;
            acc.achievedWon += report.achievedWon || 0;
            acc.achievedSales += report.achievedSales || 0;
            return acc;
        }, { targetProspects: 0, targetWon: 0, targetSales: 0, achievedProspects: 0, achievedWon: 0, achievedSales: 0 });

        const leadsScore = allMetrics.targetProspects > 0 ? ((allMetrics.achievedProspects / allMetrics.targetProspects) * 100).toFixed(0) : 0;
        const prospectsScore = allMetrics.targetWon > 0 ? ((allMetrics.achievedWon / allMetrics.targetWon) * 100).toFixed(0) : 0;
        const salesScore = allMetrics.targetSales > 0 ? ((allMetrics.achievedSales / allMetrics.targetSales) * 100).toFixed(0) : 0;
        
        const validScores = [leadsScore, prospectsScore, salesScore].filter(score => score !== 0);
        const overallScore = validScores.length > 0 ? (validScores.reduce((sum, score) => sum + parseInt(score), 0) / validScores.length).toFixed(0) : 0;
        
        elements.leadsTarget.text(allMetrics.targetProspects);
        elements.leadsAchieved.text(allMetrics.achievedProspects);
        elements.leadsScore.text(`${leadsScore}%`);
        
        elements.prospectsTarget.text(allMetrics.targetWon);
        elements.prospectsAchieved.text(allMetrics.achievedWon);
        elements.prospectsScore.text(`${prospectsScore}%`);
        
        elements.salesTarget.text(formatIndianRupees(allMetrics.targetSales));
        elements.salesAchieved.text(formatIndianRupees(allMetrics.achievedSales));
        elements.salesScore.text(`${salesScore}%`);
        
        elements.overallScore.text(`${overallScore}%`);
    }

    function applyPerformanceReportFilters() {
        const fromDateStr = elements.performanceFromDate.val();
        const toDateStr = elements.performanceToDate.val();
        const employeeId = elements.performanceFilterEmployee.val();
        const organizationId = elements.performanceFilterOrganization.val();
        const processId = elements.performanceFilterProcess.val();
    
        let filteredData = performanceData;

        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
    
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                 alert('Invalid date format. Please use DD/MM/YYYY.');
                 return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            filteredData = filteredData.filter(report => {
                const reportDate = parseDate(report.date);
                return (!fromDate || reportDate >= fromDate) && (!toDate || reportDate <= toDate);
            });
        }
        
        if (employeeId) {
            filteredData = filteredData.filter(report => report.employeeId === employeeId);
        }
        if (organizationId) {
            filteredData = filteredData.filter(report => report.organizationId === organizationId);
        }
        if (processId) {
            filteredData = filteredData.filter(report => report.processId === processId);
        }

        renderPerformanceReportCards(filteredData);
    }

    function downloadPerformanceReport() {
        const fromDateStr = elements.performanceFromDate.val();
        const toDateStr = elements.performanceToDate.val();
        const employeeId = elements.performanceFilterEmployee.val();
        const organizationId = elements.performanceFilterOrganization.val();
        const processId = elements.performanceFilterProcess.val();

        let filteredData = performanceData;
        
        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                 alert('Invalid date format. Please use DD/MM/YYYY.');
                 return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            filteredData = filteredData.filter(report => {
                const reportDate = parseDate(report.date);
                return (!fromDate || reportDate >= fromDate) && (!toDate || reportDate <= toDate);
            });
        }
        if (employeeId) {
            filteredData = filteredData.filter(report => report.employeeId === employeeId);
        }
        if (organizationId) {
            filteredData = filteredData.filter(report => report.organizationId === organizationId);
        }
        if (processId) {
            filteredData = filteredData.filter(report => report.processId === processId);
        }

        if (filteredData.length === 0) {
            alert('No data found for the selected date range and filters.');
            return;
        }

        const getEmployeeName = (empId) => employees.find(e => e.id === empId)?.name || '';
        const getOrgName = (orgId) => organizations.find(o => o._id === orgId)?.name || '';
        const getProcessName = (procId) => processes.find(p => p._id === procId)?.name || '';

        const headers = ["Date", "Employee Name", "Organization", "Process", "#Prospects (Target)", "#Won (Target)", "Value (INR) (Target)", "#Prospects (Achieved)", "#Won (Achieved)", "Value (INR) (Achieved)"];
        let csvContent = headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

        filteredData.forEach(report => {
            const row = [
                report.date,
                getEmployeeName(report.employeeId),
                getOrgName(report.organizationId),
                getProcessName(report.processId),
                report.targetProspects || '0',
                report.targetWon || '0',
                report.targetSales || '0',
                report.achievedProspects || '0',
                report.achievedWon || '0',
                report.achievedSales || '0'
            ];
            csvContent += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        
        const fromDateFileName = fromDateStr ? fromDateStr.replace(/\//g, '-') : 'all';
        const toDateFileName = toDateStr ? toDateStr.replace(/\//g, '-') : 'all';
        link.setAttribute("download", `performance_report_${fromDateFileName}_to_${toDateFileName}.csv`);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function populateAllocatedTaskEditModal(task) {
        $('#editAllocatedTaskModalId').text(task.id);
        $('#currentEditAllocatedTaskId').val(task.id);
        $('#editAllocatedTaskEmployeeSelect').val(task.assignedTo).trigger('change.select2');
        $('#editAllocatedDueDate').val(task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '');
        $('#editAllocatedTaskDescription').val(task.task);
    }

    function saveAllocatedTaskChanges() {
        const id = $('#currentEditAllocatedTaskId').val();
        const dueDate = $('#editAllocatedDueDate').val();
        const taskDesc = $('#editAllocatedTaskDescription').val();

        if (!dueDate || !taskDesc) {
            alert('Due Date and Task Description are required.');
            return;
        }

        const taskIndex = allocatedTasksData.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            allocatedTasksData[taskIndex].dueDate = formatDateToISO(dueDate);
            allocatedTasksData[taskIndex].task = taskDesc;
            alert('Task updated successfully!');
            renderAllocatedTasksAdmin(elements.allocatedTaskStatusFilter.val());
            applyTaskAllocatedReportFilters(); // Re-render the report table
            $('#allocatedTaskEditModal').modal('hide');
        }
    }

    function toggleAllocatedTaskActivation(taskId, newStatus) {
        const taskIndex = allocatedTasksData.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            alert('Task not found.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE allocated task ${taskId}?`
            : `Are you sure you want to DEACTIVATE allocated task ${taskId}? This will hide it from the dashboards.`;
        
        if (!confirm(confirmMessage)) {
            return;
        }

        allocatedTasksData[taskIndex].isActive = newStatus;
        alert(`Allocated task ${taskId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
        renderAllocatedTasksAdmin(elements.allocatedTaskStatusFilter.val());
        applyTaskAllocatedReportFilters(); // Re-render the report table
    }

    function renderHourlyUpdatesAdminTable() {
        const $tableBody = elements.hourlyUpdatesAdminTableBody;
        if (!$tableBody.length) return;
        $tableBody.empty();

        const fromDateStr = $('#hourlyReportFromDate').val();
        const toDateStr = $('#hourlyReportToDate').val();
        const employeeId = $('#hourlyReportFilterEmployee').val();
        const organizationId = $('#hourlyReportFilterOrganization').val();
        const processId = $('#hourlyReportFilterProcess').val();

        let dataToRender = hourlyUpdatesAdmin;
        
        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
    
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                 alert('Invalid date format. Please use DD/MM/YYYY.');
                 return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            dataToRender = dataToRender.filter(update => {
                const updateDate = parseDate(update.date);
                return (!fromDate || updateDate >= fromDate) && (!toDate || updateDate <= toDate);
            });
        }
        if (employeeId) {
            dataToRender = dataToRender.filter(update => update.employeeId === employeeId);
        }
        if (organizationId) {
            dataToRender = dataToRender.filter(update => update.organizationId === organizationId);
        }
        if (processId) {
            dataToRender = dataToRender.filter(update => update.processId === processId);
        }


        if (dataToRender.length === 0) {
            $tableBody.append(`<tr><td colspan="9" class="text-center">No hourly updates found.</td></tr>`);
            return;
        }

        dataToRender.forEach(update => {
            const employeeName = employees.find(e => e.id === update.employeeId)?.name || 'N/A';
            const orgName = organizations.find(o => o._id === update.organizationId)?.name || 'N/A';
            const processName = processes.find(p => p._id === update.processId)?.name || 'N/A';
            const salesFormatted = formatIndianRupees(update.sales);

            const row = `
                <tr>
                    <td>${update.date}</td>
                    <td>${update.timeSlot}</td>
                    <td>${employeeName}</td>
                    <td>${orgName}</td>
                    <td>${processName}</td>
                    <td>${update.calls}</td>
                    <td>${update.prospects}</td>
                    <td>${update.wonCases}</td>
                    <td>${salesFormatted}</td>
                </tr>
            `;
            $tableBody.append(row);
        });
    }

    function downloadHourlyReport() {
        const fromDateStr = $('#hourlyReportFromDate').val();
        const toDateStr = $('#hourlyReportToDate').val();
        const employeeId = $('#hourlyReportFilterEmployee').val();
        const organizationId = $('#hourlyReportFilterOrganization').val();
        const processId = $('#hourlyReportFilterProcess').val();

        let filteredData = hourlyUpdatesAdmin;

        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                 alert('Invalid date format. Please use DD/MM/YYYY.');
                 return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            filteredData = filteredData.filter(update => {
                const updateDate = parseDate(update.date);
                return (!fromDate || updateDate >= fromDate) && (!toDate || updateDate <= toDate);
            });
        }
        if (employeeId) {
            filteredData = filteredData.filter(update => update.employeeId === employeeId);
        }
        if (organizationId) {
            filteredData = filteredData.filter(update => update.organizationId === organizationId);
        }
        if (processId) {
            filteredData = filteredData.filter(update => update.processId === processId);
        }

        if (filteredData.length === 0) {
            alert('No data found for the selected date range and filters.');
            return;
        }

        const getEmployeeName = (empId) => employees.find(e => e.id === empId)?.name || '';
        const getOrgName = (orgId) => organizations.find(o => o._id === orgId)?.name || '';
        const getProcessName = (procId) => processes.find(p => p._id === procId)?.name || '';

        const headers = ["Date", "Time Slot", "Employee Name", "Organization", "Process", "#Calls", "#Prospects", "#Won", "Value (INR)"];
        let csvContent = headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

        filteredData.forEach(update => {
            const row = [
                update.date,
                update.timeSlot,
                getEmployeeName(update.employeeId),
                getOrgName(update.organizationId),
                getProcessName(update.processId),
                update.calls,
                update.prospects,
                update.wonCases,
                update.sales
            ];
            csvContent += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        
        const fromDateFileName = fromDateStr ? fromDateStr.replace(/\//g, '-') : 'all';
        const toDateFileName = toDateStr ? toDateStr.replace(/\//g, '-') : 'all';
        link.setAttribute("download", `hourly_report_${fromDateFileName}_to_${toDateFileName}.csv`);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function applyDailyWorkUpdatesFilter() {
        const fromDateStr = elements.dailyWorkFromDate.val();
        const toDateStr = elements.dailyWorkToDate.val();
        const employeeId = elements.dailyWorkFilterEmployee.val();
        const organizationId = elements.dailyWorkFilterOrganization.val();
        const processId = elements.dailyWorkFilterProcess.val();
    
        let filteredData = dailyWorkReportData;

        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
    
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                 alert('Invalid date format. Please use DD/MM/YYYY.');
                 return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            filteredData = filteredData.filter(report => {
                const reportDate = parseDate(report.date);
                return (!fromDate || reportDate >= fromDate) && (!toDate || reportDate <= toDate);
            });
        }
        
        if (employeeId) {
            filteredData = filteredData.filter(report => report.employeeId === employeeId);
        }
        if (organizationId) {
            filteredData = filteredData.filter(report => report.organizationId === organizationId);
        }
        if (processId) {
            filteredData = filteredData.filter(report => report.processId === processId);
        }

        renderDailyWorkReportTable(filteredData);
    }

    function downloadDailyWorkUpdatesReport() {
        const fromDateStr = elements.dailyWorkFromDate.val();
        const toDateStr = elements.dailyWorkToDate.val();
        const employeeId = elements.dailyWorkFilterEmployee.val();
        const organizationId = elements.dailyWorkFilterOrganization.val();
        const processId = elements.dailyWorkFilterProcess.val();

        let filteredData = dailyWorkReportData;

        if (fromDateStr || toDateStr) {
            const fromDate = fromDateStr ? parseDate(fromDateStr) : null;
            const toDate = toDateStr ? parseDate(toDateStr) : null;
            if ((fromDateStr && !fromDate) || (toDateStr && !toDate)) {
                 alert('Invalid date format. Please use DD/MM/YYYY.');
                 return;
            }
            if (fromDate && toDate && fromDate > toDate) {
                alert('From Date cannot be after To Date.');
                return;
            }
            filteredData = filteredData.filter(report => {
                const reportDate = parseDate(report.date);
                return (!fromDate || reportDate >= fromDate) && (!toDate || reportDate <= toDate);
            });
        }
        if (employeeId) {
            filteredData = filteredData.filter(report => report.employeeId === employeeId);
        }
        if (organizationId) {
            filteredData = filteredData.filter(report => report.organizationId === organizationId);
        }
        if (processId) {
            filteredData = filteredData.filter(report => report.processId === processId);
        }

        if (filteredData.length === 0) {
            alert('No data found for the selected date range and filters.');
            return;
        }

        const getOrgName = (orgId) => organizations.find(o => o._id === orgId)?.name || '';
        const getProcessName = (procId) => processes.find(p => p._id === procId)?.name || '';
        const getEmployeeName = (empId) => employees.find(e => e.id === empId)?.name || '';

        const headers = ["Date", "Employee Name", "Organization", "Process", "#Prospects (Target)", "#Won (Target)", "Value (INR) (Target)", "#Calls (Achieved)", "#Prospects (Achieved)", "#Won (Achieved)", "Value (INR) (Achieved)"];
        let csvContent = headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

        filteredData.forEach(report => {
            const row = [
                report.date,
                getEmployeeName(report.employeeId),
                getOrgName(report.organizationId),
                getProcessName(report.processId),
                report.prospects || '0',
                report.wonCases || '0',
                report.sales || '0',
                report.achievedCalls || '0',
                report.achievedProspects || '0',
                report.achievedWon || '0',
                report.achievedSales || '0'
            ];
            csvContent += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        
        const fromDateFileName = fromDateStr ? fromDateStr.replace(/\//g, '-') : 'all';
        const toDateFileName = toDateStr ? toDateStr.replace(/\//g, '-') : 'all';
        link.setAttribute("download", `daily_work_report_${fromDateFileName}_to_${toDateFileName}.csv`);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                populateDropdown(elements.assignEmployeeSelect, employees.filter(e => e.id !== 'adminaccount'), 'id', 'name', 'Select Employee');
                elements.assignOrganizationSelect.val(null).trigger('change.select2');
                elements.assignProcessSelect.val(null).trigger('change.select2');
                break;
            case 'masters':
                const activeTabButton = document.querySelector('#masterTabs button.active');
                const masterType = activeTabButton ? activeTabButton.dataset.masterPane : 'employee-master';
                $(`#${masterType}-pane`).addClass('show active');
                switch (masterType) {
                    case 'employee-master': 
                        loadEmployeesMaster();
                        $('#addEmployeeForm')[0].reset();
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
            case 'view-update-tasks':
                elements.dailyWorkFromDate.val('');
                elements.dailyWorkToDate.val('');
                elements.dailyWorkFilterEmployee.val('').trigger('change.select2');
                elements.dailyWorkFilterOrganization.val('').trigger('change.select2');
                elements.dailyWorkFilterProcess.val('').trigger('change.select2');
                applyDailyWorkUpdatesFilter();
                break;
            case 'performance-report':
                elements.performanceFromDate.val('');
                elements.performanceToDate.val('');
                elements.performanceFilterEmployee.val('').trigger('change.select2');
                elements.performanceFilterOrganization.val('').trigger('change.select2');
                elements.performanceFilterProcess.val('').trigger('change.select2');
                applyPerformanceReportFilters();
                break;
            case 'hourly-updates-admin':
                elements.hourlyReportFromDate.val('');
                elements.hourlyReportToDate.val('');
                elements.hourlyReportFilterEmployee.val('').trigger('change.select2');
                elements.hourlyReportFilterOrganization.val('').trigger('change.select2');
                elements.hourlyReportFilterProcess.val('').trigger('change.select2');
                renderHourlyUpdatesAdminTable();
                break;
            case 'task-allocation':
                populateDropdown(elements.allocateEmployeeSelect, employees.filter(emp => emp.isActive), 'id', 'name', 'Select Employee', false);
                renderAllocatedTasksAdmin(elements.allocatedTaskStatusFilter.val() || '');
                break;
            case 'task-allocated-report':
                elements.taskAllocatedFromDate.val('');
                elements.taskAllocatedToDate.val('');
                elements.taskAllocatedFilterEmployee.val('').trigger('change.select2');
                elements.taskAllocatedFilterStatus.val('').trigger('change.select2');
                applyTaskAllocatedReportFilters();
                break;
        }
    }
    
    function setupCreateTaskCascades() {
        elements.taskOrganizationSelect.on('change', function() {
            const orgId = $(this).val();
            const filteredProcesses = orgId ? processes.filter(p => p.organizationId === orgId) : [];
            const filteredEmployees = orgId ? employees.filter(e => e.organizations.includes(orgId)) : [];
            populateDropdown(elements.taskProcessSelect, filteredProcesses, '_id', 'name', 'Select Process');
            populateDropdown(elements.taskEmployeeSelect, filteredEmployees, 'id', 'name', 'Select Employee');
        }).trigger('change');
        elements.taskProcessSelect.on('change', function() {
            const processId = $(this).val();
            const orgId = elements.taskOrganizationSelect.val();
            const filteredCampaigns = processId ? campaigns.filter(c => c.processId === processId && c.organizationId === orgId) : [];
            populateDropdown(elements.leadsQuantityCampaignMaster, filteredCampaigns, '_id', 'name', 'Select Campaign');
            populateDropdown(elements.prospectsQuantityCampaignMaster, filteredCampaigns, '_id', 'name', 'Select Campaign');
        }).trigger('change');
    }
    
    function setupAssignFormCascades() {
        elements.assignEmployeeSelect.on('change', function() {
            const empId = $(this).val();
            const employee = employees.find(e => e.id === empId);
            if (employee) {
                elements.assignOrganizationSelect.val(employee.organizations || []).trigger('change.select2');
                elements.assignProcessSelect.val(employee.processes || []).trigger('change.select2');
            } else {
                elements.assignOrganizationSelect.val(null).trigger('change.select2');
                elements.assignProcessSelect.val(null).trigger('change.select2');
            }
        });
        
        elements.assignOrganizationSelect.on('change', function() {
            const selectedOrgIds = $(this).val();
            const filteredProcesses = selectedOrgIds.length ? processes.filter(p => selectedOrgIds.includes(p.organizationId)) : [];
            populateDropdown(elements.assignProcessSelect, filteredProcesses, '_id', 'name', 'Select Process(s)');
        });
    }

    $(document).ready(() => {
        initializeUIComponents();
        updateAllDashboardDropdowns();
        setupAssignFormCascades();
        
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
                    $('#addEmployeeForm')[0].reset();
                    break;
                case 'organization-master': loadOrganizations(); break;
                case 'process-master': loadProcesses(); break;
                case 'campaign-master': loadCampaigns(); break;
            }
        });
        
        setupEmployeeTableHandlers();
        $('#addEmployeeForm').on('submit', function(e) {
            e.preventDefault();
            const newEmployee = {
                id: $('#employeeId').val().trim(),
                name: $('#employeeName').val().trim(),
                designation: $('#employeeDesignation').val().trim(),
                department: $('#employeeDepartment').val().trim(),
                location: $('#employeeLocation').val().trim(),
                langKnown: $('#employeeLangKnown').val().trim(),
                employeeType: $('#employeeType').val(),
                organizations: [],
                processes: [],
                isActive: true, username: null, password: null, role: null
            };
            if (Object.values(newEmployee).some(v => !v || (Array.isArray(v) && v.length === 0 && v !== newEmployee.organizations && v !== newEmployee.processes))) { alert('Please fill in all fields for the new employee.'); return; }
            if (employees.some(emp => emp.id === newEmployee.id)) { alert('Employee ID must be unique. Please use a different ID.'); return; }
            employees.push(newEmployee);
            alert('Employee added successfully!');
            $(this)[0].reset();
            loadEmployeesMaster();
            loadEmployees();
            updateAllDashboardDropdowns();
        });
        
        $('#assignOrgProcessForm').on('submit', function(e) {
            e.preventDefault();
            const employeeId = elements.assignEmployeeSelect.val();
            const selectedOrganizations = elements.assignOrganizationSelect.val();
            const selectedProcesses = elements.assignProcessSelect.val();

            if (!employeeId || !selectedOrganizations || !selectedProcesses) {
                alert('Please select an Employee, at least one Organization, and at least one Process.');
                return;
            }

            const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
            if (employeeIndex !== -1) {
                employees[employeeIndex].organizations = selectedOrganizations;
                employees[employeeIndex].processes = selectedProcesses;
                alert('Organization and Process assigned successfully!');
                renderEmployeesTable(elements.employeesTableBody, false);
                renderEmployeesTable(elements.employeeMasterTableBody, true);
                updateAllDashboardDropdowns();
                $(this)[0].reset();
                elements.assignEmployeeSelect.val(null).trigger('change.select2');
                elements.assignOrganizationSelect.val(null).trigger('change.select2');
                elements.assignProcessSelect.val(null).trigger('change.select2');
            } else {
                alert('Employee not found.');
            }
        });

        $('#manageLoginForm').on('submit', function(e) {
            e.preventDefault();
            const targetEmployee = employees.find(e => e.id === $('#loginEmployeeId').val());
            if (!targetEmployee) { alert('Please select an Employee.'); return; }
            const username = $('#username').val().trim();
            const password = $('#password').val().trim();
            const role = $('#userRole').val();
            if (!username || !password || !role) { alert('Username, Password, and Role are required.'); return; }
            if (employees.some(e => e.username === username && e.id !== targetEmployee.id)) { alert('Username already exists for another user.'); return; }
            targetEmployee.username = username;
            targetEmployee.password = password;
            targetEmployee.role = role;
            alert(`Login for ${targetEmployee.name} created/updated successfully!`);
            $(this)[0].reset();
            $('#loginEmployeeId').val('').trigger('change.select2');
            loadEmployeesMaster();
            loadEmployees();
        });
        
        elements.profileEmployeeOrganization.on('change', function() {
            const selectedOrgIds = $(this).val();
            const employee = employees.find(e => e.id === $('#currentProfileEmployeeId').val());
            updateProcessesDropdown(selectedOrgIds, employee ? employee.processes : []);
        });

        $('#enableProfileEditBtn').on('click', function() {
            const isEditMode = $(this).text() === 'Edit';
            toggleProfileEditMode(isEditMode);
            if (isEditMode) {
                const employee = employees.find(e => e.id === $('#currentProfileEmployeeId').val());
                if (employee) {
                    elements.profileEmployeeProcesses.val(employee.processes || []).trigger('change.select2');
                }
            }
        });
        
        $('#updateProfileBtn').on('click', updateEmployeeProfile);
        
        $('#organizationsTableBody').on('click', '.toggle-master-status-btn', function() { toggleMasterActivation($(this).data('id'), 'organization', $(this).data('status')); });
        $('#processesTableBody').on('click', '.toggle-master-status-btn', function() { toggleMasterActivation($(this).data('id'), 'process', $(this).data('status')); });
        $('#campaignsTableBody').on('click', '.toggle-master-status-btn', function() { toggleMasterActivation($(this).data('id'), 'campaign', $(this).data('status')); });

        $('#orgForm').on('submit', function(e) {
            e.preventDefault();
            const name = $('#organizationNameInput').val().trim();
            if (!name) return;
            const newOrg = { _id: `CO${(organizations.length + 1).toString().padStart(3, '0')}`, name, isActive: true };
            organizations.push(newOrg);
            alert('Organization added!');
            $(this)[0].reset();
            loadOrganizations();
            updateAllDashboardDropdowns();
        });
        $('#processForm').on('submit', function(e) {
            e.preventDefault();
            const organizationId = $('#processOrganizationSelect').val();
            const name = $('#processNameInput').val().trim();
            if (!organizationId || !name) { alert('All fields are required.'); return; }
            const newProcess = { _id: `PRO${(processes.length + 1).toString().padStart(3, '0')}`, name, organizationId, isActive: true };
            processes.push(newProcess);
            alert('Process added!');
            $(this)[0].reset();
            $('#processOrganizationSelect').val(null).trigger('change.select2');
            loadProcesses();
            updateAllDashboardDropdowns();
        });
        $('#campaignForm').on('submit', function(e) {
            e.preventDefault();
            const organizationId = $('#campaignOrganizationSelect').val();
            const processId = $('#campaignProcessSelect').val();
            const name = $('#campaignNameInput').val().trim();
            if (!organizationId || !processId || !name) { alert('All fields are required.'); return; }
            const newCampaign = { _id: `CAMP${(campaigns.length + 1).toString().padStart(3, '0')}`, name, organizationId, processId, isActive: true };
            campaigns.push(newCampaign);
            alert('Campaign added!');
            $(this)[0].reset();
            $('#campaignOrganizationSelect, #campaignProcessSelect').val(null).trigger('change.select2');
            loadCampaigns();
            updateAllDashboardDropdowns();
        });
        
        $('#allocateTaskForm').on('submit', function(e) {
            e.preventDefault();
            const assignedTo = $('#allocateEmployeeSelect').val();
            const dueDate = $('#allocateDueDate').val();
            const task = $('#allocateTaskDescription').val();
            if (!assignedTo || !dueDate || !task) { alert('All fields are required.'); return; }
            const newTask = {
                id: `ATID${(allocatedTasksData.length + 1).toString().padStart(3, '0')}`,
                assignedTo,
                assignedDate: new Date().toISOString().split('T')[0],
                taskCompletedDate: null,
                dueDate: formatDateToISO(dueDate),
                task,
                remark: null,
                status: 'Pending',
                isActive: true
            };
            allocatedTasksData.push(newTask);
            alert('New task allocated successfully!');
            $(this)[0].reset();
            $('#allocateEmployeeSelect').val(null).trigger('change.select2');
            renderAllocatedTasksAdmin();
            applyTaskAllocatedReportFilters(); // Re-render the report table
        });
        elements.allocatedTasksTableBody.on('click', '.edit-allocated-task-btn', function() {
            const taskId = $(this).data('id');
            const task = allocatedTasksData.find(t => t.id === taskId);
            if (task) {
                populateAllocatedTaskEditModal(task);
                $('#allocatedTaskEditModal').modal('show');
            }
        });
        $('#saveAllocatedTaskChangesBtn').on('click', saveAllocatedTaskChanges);
        elements.allocatedTasksTableBody.on('click', '.toggle-allocated-task-status-btn', function() {
            toggleAllocatedTaskActivation($(this).data('id'), $(this).data('status'));
        });
        
        elements.allocatedTaskStatusFilter.on('change', function() {
            const selectedStatus = $(this).val();
            renderAllocatedTasksAdmin(selectedStatus);
        });

        $('#applyDailyWorkFilterBtn').on('click', function() {
            applyDailyWorkUpdatesFilter();
        });
        
        elements.dailyWorkFilterOrganization.on('change', function() {
            const selectedOrgId = $(this).val();
            const $procSelect = elements.dailyWorkFilterProcess;
            $procSelect.empty().append('<option value="">All</option>');

            if (selectedOrgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === selectedOrgId);
                filteredProcesses.forEach(proc => $procSelect.append(new Option(proc.name, proc._id)));
            }
            $procSelect.trigger('change.select2');
        });
        
        elements.dailyWorkFromDate.on('change', applyDailyWorkUpdatesFilter);
        elements.dailyWorkToDate.on('change', applyDailyWorkUpdatesFilter);
        elements.dailyWorkFilterEmployee.on('change', applyDailyWorkUpdatesFilter);
        elements.dailyWorkFilterOrganization.on('change', applyDailyWorkUpdatesFilter);
        elements.dailyWorkFilterProcess.on('change', applyDailyWorkUpdatesFilter);

        elements.downloadDailyWorkReportBtn.on('click', function() {
            downloadDailyWorkUpdatesReport();
        });

        $('#clearDailyWorkFiltersBtn').on('click', function() {
            elements.dailyWorkFromDate.val('');
            elements.dailyWorkToDate.val('');
            elements.dailyWorkFilterEmployee.val('').trigger('change.select2');
            elements.dailyWorkFilterOrganization.val('').trigger('change.select2');
            elements.dailyWorkFilterProcess.val('').trigger('change.select2');
            applyDailyWorkUpdatesFilter();
        });
        
        elements.hourlyReportFromDate.on('change', renderHourlyUpdatesAdminTable);
        elements.hourlyReportToDate.on('change', renderHourlyUpdatesAdminTable);
        elements.hourlyReportFilterEmployee.on('change', renderHourlyUpdatesAdminTable);
        elements.hourlyReportFilterOrganization.on('change', renderHourlyUpdatesAdminTable);
        elements.hourlyReportFilterProcess.on('change', renderHourlyUpdatesAdminTable);

        elements.hourlyReportFilterOrganization.on('change', function() {
            const selectedOrgId = $(this).val();
            const $procSelect = elements.hourlyReportFilterProcess;
            $procSelect.empty().append('<option value="">All</option>');
            if (selectedOrgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === selectedOrgId);
                filteredProcesses.forEach(proc => $procSelect.append(new Option(p.name, p._id)));
            }
            $procSelect.trigger('change.select2');
        });

        $('#applyHourlyFilterBtn').on('click', function() {
            renderHourlyUpdatesAdminTable();
        });

        $('#clearHourlyFiltersBtn').on('click', function() {
            elements.hourlyReportFromDate.val('');
            elements.hourlyReportToDate.val('');
            elements.hourlyReportFilterEmployee.val('').trigger('change.select2');
            elements.hourlyReportFilterOrganization.val('').trigger('change.select2');
            elements.hourlyReportFilterProcess.val('').trigger('change.select2');
            renderHourlyUpdatesAdminTable();
        });

        elements.downloadHourlyReportBtn.on('click', downloadHourlyReport);

        elements.applyTaskAllocatedFilterBtn.on('click', applyTaskAllocatedReportFilters);
        elements.taskAllocatedFilterStatus.on('change', applyTaskAllocatedReportFilters);
        elements.taskAllocatedFromDate.on('change', applyTaskAllocatedReportFilters);
        elements.taskAllocatedToDate.on('change', applyTaskAllocatedReportFilters);
        elements.taskAllocatedFilterEmployee.on('change', applyTaskAllocatedReportFilters);
        elements.clearTaskAllocatedFiltersBtn.on('click', () => {
            elements.taskAllocatedFromDate.val('');
            elements.taskAllocatedToDate.val('');
            elements.taskAllocatedFilterEmployee.val('').trigger('change.select2');
            elements.taskAllocatedFilterStatus.val('').trigger('change.select2');
            applyTaskAllocatedReportFilters();
        });
        elements.downloadTaskAllocatedReportBtn.on('click', downloadTaskAllocatedReport);

        $('#applyPerformanceFilterBtn').on('click', applyPerformanceReportFilters);
        $('#clearPerformanceFiltersBtn').on('click', () => {
            elements.performanceFromDate.val('');
            elements.performanceToDate.val('');
            elements.performanceFilterEmployee.val('').trigger('change.select2');
            elements.performanceFilterOrganization.val('').trigger('change.select2');
            elements.performanceFilterProcess.val('').trigger('change.select2');
            applyPerformanceReportFilters();
        });
        elements.performanceFilterOrganization.on('change', function() {
            const selectedOrgId = $(this).val();
            const $procSelect = elements.performanceFilterProcess;
            $procSelect.empty().append('<option value="">All</option>');
            if (selectedOrgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === selectedOrgId);
                filteredProcesses.forEach(proc => $procSelect.append(new Option(proc.name, proc._id)));
            }
            $procSelect.trigger('change.select2');
        });
        elements.downloadPerformanceReportBtn.on('click', downloadPerformanceReport);

        $('#createTaskForm').on('submit', function(e) {
            e.preventDefault();
            const newTask = {
                id: `TID${(allTasksData.length + 1).toString().padStart(3, '0')}`,
                taskDate: formatDateToISO($('#taskDate').val()),
                organization: $('#taskOrganizationSelect').val(),
                process: $('#taskProcessSelect').val(),
                assignedToEmployee: $('#taskEmployeeSelect').val(),
                status: 'Pending', generalComment: $('#generalComment').val() || null, isActive: true,
                leads: null, prospects: null, activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0
            };
            if ($('#rightBoxLeads option').length > 0) {
                newTask.leads = {
                    dateFrom: formatDateToISO($('#leadsDateFrom').val()),
                    dateTo: formatDateToISO($('#leadsDateTo').val()),
                    month: $('#leadsAssignmentMonth').val(),
                    year: $('#leadsAssignmentYear').val(),
                    region: $('#leadsAssignmentRegion').val(),
                    campaign: $('#leadsQuantityCampaignMaster').val(),
                    quantity: parseInt($('#leadsQty').val()) || 0,
                    convertToProspects: parseInt($('#convertToProspects').val()) || 0,
                    comment: $('#leadsComment').val(),
                    assignments: getSelectionsFromListbox('rightBoxLeads')
                };
            }
            if ($('#rightBoxProspects option').length > 0) {
                newTask.prospects = {
                    dateFrom: formatDateToISO($('#prospectsDateFrom').val()),
                    dateTo: formatDateToISO($('#prospectsDateTo').val()),
                    month: $('#prospectsAssignmentMonth').val(),
                    year: $('#prospectsAssignmentYear').val(),
                    region: $('#prospectsAssignmentRegion').val(),
                    campaign: $('#prospectsQuantityCampaignMaster').val(),
                    quantity: parseInt($('#prospectsQty').val()) || 0,
                    convertToWon: parseInt($('#convertToWon').val()) || 0,
                    employeeSaleTarget: parseFloat($('#employeeSaleTarget').val()) * 100000 || 0,
                    comment: $('#prospectsComment').val(),
                    assignments: getSelectionsFromListbox('rightBoxProspects')
                };
            }
            allTasksData.push(newTask);
            alert('Task created successfully!');
            $(this)[0].reset();
            initializeTaskAssignmentBuilders();
            setupCreateTaskCascades();
            updateAllDashboardDropdowns();
        });
    });
})(jQuery);