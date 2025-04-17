import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Col, Row, Drawer, FormInstance, TreeSelect, TreeDataNode } from 'antd';
import { DepartmentModel } from '../../models/departmentModel';

interface DepartmentFormProps {
    form: FormInstance
    open: boolean;
    isNew: boolean;
    departmentTree: TreeDataNode[] | [];
    targetDep: DepartmentModel | null;
    hideDrawer: () => void;
    onFinish: (values: any) => void;
}
const DepartmentForm: React.FC<DepartmentFormProps> = ({ form, open, isNew, departmentTree, targetDep, hideDrawer, onFinish }) => {
    useEffect(() => {
        if (targetDep != null) {
            form.setFieldsValue({
                ...targetDep,
            });
        } else {
            form.resetFields();
        }
    }, [targetDep]);

    const [topDepValue, setValue] = useState<number>(1);

    const onChange = (newValue: number) => {
      setValue(topDepValue);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Drawer
                title={isNew ? "新增部门" : "编辑部门"}
                width={360}
                open={open}
                onClose={hideDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="部门名称"
                                rules={[{ required: true, message: '请输入部门名称' }, { type: 'string' }, { whitespace: true, message: '部门名称不能包含空格' }]}
                            >
                                <Input placeholder="请输入部门名称" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="parentId"
                                label="上级部门"
                                rules={[{ required: true, message: '请选择上级部门' }]}
                            >
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    value={topDepValue}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    onChange={onChange}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                    treeData={departmentTree}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="memo"
                                label="备注"
                            >
                                <Input.TextArea placeholder="请输入备注" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button onClick={hideDrawer}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default DepartmentForm;