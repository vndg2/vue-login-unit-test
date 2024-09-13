import { shallowMount } from '@vue/test-utils';
import Login from '@/components/LoginForm.vue';  // Đảm bảo đường dẫn này đúng với cấu trúc thư mục của bạn

describe('Login.vue', () => {
  it('renders form elements', () => {
    const wrapper = shallowMount(Login);

    // Kiểm tra các phần tử HTML có tồn tại trong component (có thể bỏ qua test case này)
    expect(wrapper.find('h2').text()).toBe('Login');
    expect(wrapper.find('input#username').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Login');
  });

  it('shows validation errors when fields are empty', async () => {
    const wrapper = shallowMount(Login);

    // Tạo một sự kiện submit
    await wrapper.find('form').trigger('submit.prevent');

    // Kiểm tra lỗi xuất hiện
    expect(wrapper.find('span.error').text()).toContain('Username is required.');
    expect(wrapper.findAll('span.error')[1].text()).toContain('Password is required.');
  });

  it('shows password length error', async () => {
    const wrapper = shallowMount(Login);

    // Nhập dữ liệu vào trường password
    await wrapper.find('input#username').setValue('testuser');
    await wrapper.find('input#password').setValue('short');

    await wrapper.find('form').trigger('submit.prevent');

    // Kiểm tra lỗi mật khẩu
    expect(wrapper.find('span.error').text()).toContain('Password must be at least 6 characters.');
  });

  it('does not show errors when form is valid', async () => {
    const wrapper = shallowMount(Login);

    // Nhập dữ liệu hợp lệ vào các trường
    await wrapper.find('input#username').setValue('validuser');
    await wrapper.find('input#password').setValue('validpassword');

    await wrapper.find('form').trigger('submit.prevent');

    // Kiểm tra không có lỗi xuất hiện
    expect(wrapper.findAll('span.error').length).toBe(0);
  });

  it('calls handleLogin when submit login form', async () => {
    const handleLogin = jest.fn();
    const wrapper = shallowMount(Login, {
      global: {
        mocks: {handleLogin}
      }
    });

    // Nhập dữ liệu hợp lệ vào các trường
    await wrapper.find('input#username').setValue('validuser');
    await wrapper.find('input#password').setValue('validpassword');

    await wrapper.find('form').trigger('submit.prevent');

    // Kiểm tra hàm handleLogin được gọi
    expect(handleLogin).toHaveBeenCalled();
  });

  it('Show login successful alert when form valid', async () => {
    // mock alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = shallowMount(Login);

    await wrapper.find('input#username').setValue('validuser');
    await wrapper.find('input#password').setValue('validpassword');

    await wrapper.find('form').trigger('submit.prevent');

    expect(alertMock).toHaveBeenCalledWith('Login successful');
    alertMock.mockRestore();
  });
  
});
