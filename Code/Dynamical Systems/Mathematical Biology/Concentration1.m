% This file can be used to solve the diffusion-advection 
% equation u_t=cu_x+Du_xx on [a,b] for different initial conditions 
% and different boundary conditions at x=a and x=b
% It uses the inbuilt matlab pde solver pdepe


function Concentration1

close all

% The parameter m is an input to pdepe - m=0 gives solution along a line
%  Note that m=1 gives radially symmetric solution
m = 0;
% Define the spatial domain and step size
x = linspace(0,1,20);
% Define the time span
t = linspace(0,50,50);

% Run the PDE solver using the diffusion-advection equation, with initial 
% and boundary conditions all specified in functions defined below
sol = pdepe(m,@cons1pde,@cons1ic,@cons1bc,x,t);

% Extract the first solution component as u.
u = sol(:,:,1);

% A surface plot is often a good way to study a solution.
surf(x,t,u)    
title('First Example of an Advection-Diffusion Equation')
xlabel('Distance x')
ylabel('Time t')
zlabel('Concentration u')
end


% This defines the PDE equation in f
function [c,f,s] = cons1pde(~,~,u,DuDx)
% c is the coefficient in front of u_t
c = 1;
% f is the flux term in the pde
f = -0.005*u+0.0001*DuDx;
% s is the source or sink term in the PDE
s = 0;
end



function u0 = cons1ic(x)
% This gives the initial condition for the density
u0 = 5*exp(-40*(x-0.5).*(x-0.5));
end



function [pl,ql,pr,qr] = cons1bc(~,ul,~,ur,~)
% This gives boundary conditions on the left and right of the domain
% in the form p(x,t,u)+q(x,t)f=0 where f is the flux from above.
% For zero flux need q=1, p=0; for Dirichlet take pl=ul,pr=ur, q=0
pl = ul;
ql = 0;
pr = ur;
qr = 0;
end

