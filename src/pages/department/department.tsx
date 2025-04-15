import { Flex, Button, notification } from 'antd';

const DepartmentPage: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();

    const showDepartmentDrawer = () => {

    };

    return (
        <>
            {contextHolder}
            <Flex gap="middle" style={{ marginBottom: '16px' }}>
                <Button type="primary" onClick={showDepartmentDrawer}>添加部门</Button>
            </Flex>
        </>
    );
}

export default DepartmentPage;